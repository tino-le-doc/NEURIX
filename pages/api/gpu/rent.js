import { z } from "zod";
import { apiHandler } from "@/lib/apiHandler";
import { getStripe } from "@/lib/stripe";
import { getGpuOffer } from "@/lib/gpuCatalog";
import db from "@/lib/db";
import { createPendingInstance, updateInstance } from "@/lib/gpuInstances";
import logger from "@/lib/logger";

const bodySchema = z.object({
  offerId: z.string().min(1, "offerId requis"),
  hours: z.number().int().min(1).max(168),
});

/**
 * POST /api/gpu/rent
 *
 * 1. Persists a `pending_payment` GPU instance for the caller.
 * 2. Creates a Stripe Checkout Session (mode: payment, one-time) priced at
 *    `hours * offer.price`.
 * 3. Returns the checkout URL + instance id. Provisioning happens after the
 *    Stripe webhook fires (see `pages/api/billing/webhook.js`).
 */
export default apiHandler(
  {
    POST: async (req, res, { session }) => {
      const { offerId, hours } = bodySchema.parse(req.body);
      const offer = getGpuOffer(offerId);
      if (!offer) {
        return res.status(404).json({ error: "Offre GPU inconnue" });
      }

      const stripe = getStripe();
      if (!stripe) {
        return res.status(503).json({
          error: "Facturation non configurée (STRIPE_SECRET_KEY manquant)",
        });
      }

      const instance = createPendingInstance({
        userId: session.user.id,
        offer,
        hours,
      });

      // Reuse the Stripe customer already persisted for subscription billing.
      let customerId = db.findById("users", session.user.id)?.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: session.user.email,
          name: session.user.name,
          metadata: { neurix_user_id: session.user.id },
        });
        customerId = customer.id;
        db.update("users", session.user.id, { stripeCustomerId: customerId });
      }

      const origin =
        req.headers.origin ||
        process.env.NEXTAUTH_URL ||
        "http://localhost:3000";

      const checkout = await stripe.checkout.sessions.create({
        mode: "payment",
        customer: customerId,
        line_items: [
          {
            price_data: {
              currency: offer.currency,
              unit_amount: Math.round(offer.price * 100),
              product_data: {
                name: `${offer.name} — ${offer.gpu}`,
                description: `Location GPU (${hours}h)`,
              },
            },
            quantity: hours,
          },
        ],
        success_url: `${origin}/my-gpus?status=success&instance=${instance.id}`,
        cancel_url: `${origin}/gpu-rental?status=cancelled`,
        metadata: {
          neurix_user_id: session.user.id,
          neurix_gpu_instance_id: instance.id,
          neurix_kind: "gpu_rental",
          offer_id: offer.id,
          hours: String(hours),
        },
      });

      updateInstance(instance.id, { checkoutSessionId: checkout.id });

      logger.info("gpu rental checkout created", {
        userId: session.user.id,
        instanceId: instance.id,
        offerId: offer.id,
        hours,
        sessionId: checkout.id,
      });

      return res.status(200).json({
        url: checkout.url,
        instanceId: instance.id,
      });
    },
  },
  { auth: true }
);
