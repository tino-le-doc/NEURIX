import { getStripe, PLANS } from "@/lib/stripe";
import db from "@/lib/db";
import logger from "@/lib/logger";

/**
 * Stripe webhook endpoint.
 *
 * IMPORTANT: Stripe requires the raw request body for signature verification,
 * so Next.js body parsing must be disabled here.
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

function findUserByCustomerId(customerId) {
  return db.findOne("users", (u) => u.stripeCustomerId === customerId);
}

function planFromPriceId(priceId) {
  for (const plan of Object.values(PLANS)) {
    if (process.env[plan.priceEnv] === priceId) return plan.id;
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    logger.warn("stripe webhook hit but Stripe is not configured");
    return res.status(503).json({ error: "Webhook non configuré" });
  }

  const signature = req.headers["stripe-signature"];
  if (!signature) {
    return res.status(400).json({ error: "Signature manquante" });
  }

  let event;
  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    logger.error("stripe webhook signature verification failed", {
      message: err.message,
    });
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object;
        const userId = s.metadata?.neurix_user_id;
        const plan = s.metadata?.plan;
        if (userId && plan) {
          db.update("users", userId, {
            plan: PLANS[plan]?.name || plan,
            stripeSubscriptionId: s.subscription,
            stripeCustomerId: s.customer,
          });
          db.create("billing_events", {
            userId,
            service: "subscription",
            amount: (s.amount_total || 0) / 100,
            description: `Abonnement ${plan} activé`,
          });
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.created": {
        const sub = event.data.object;
        const user = findUserByCustomerId(sub.customer);
        if (user) {
          const priceId = sub.items?.data?.[0]?.price?.id;
          const planId = planFromPriceId(priceId);
          db.update("users", user.id, {
            stripeSubscriptionId: sub.id,
            plan: planId ? PLANS[planId].name : user.plan,
            subscriptionStatus: sub.status,
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object;
        const user = findUserByCustomerId(sub.customer);
        if (user) {
          db.update("users", user.id, {
            plan: "Starter",
            subscriptionStatus: "canceled",
            stripeSubscriptionId: null,
          });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        const user = findUserByCustomerId(invoice.customer);
        if (user) {
          db.create("billing_events", {
            userId: user.id,
            service: "invoice",
            amount: (invoice.amount_paid || 0) / 100,
            description: invoice.description || "Paiement reçu",
          });
        }
        break;
      }

      case "invoice.payment_failed":
        logger.warn("stripe: payment failed", {
          customer: event.data.object.customer,
        });
        break;

      default:
        logger.debug("stripe: unhandled event", { type: event.type });
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    logger.error("stripe webhook handler error", {
      type: event?.type,
      message: err.message,
    });
    return res.status(500).json({ error: "Internal handler error" });
  }
}
