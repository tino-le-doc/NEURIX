import { apiHandler } from "@/lib/apiHandler";
import { getStripe, getPriceId, PLANS } from "@/lib/stripe";
import { z } from "zod";
import db from "@/lib/db";
import logger from "@/lib/logger";

const bodySchema = z.object({
  plan: z.enum(Object.keys(PLANS)),
});

export default apiHandler(
  {
    POST: async (req, res, { session }) => {
      const stripe = getStripe();
      if (!stripe) {
        return res
          .status(503)
          .json({ error: "Facturation non configurée (STRIPE_SECRET_KEY manquant)" });
      }

      const { plan } = bodySchema.parse(req.body);
      const priceId = getPriceId(plan);
      if (!priceId) {
        return res
          .status(503)
          .json({ error: `Prix Stripe pour le plan ${plan} non configuré` });
      }

      // Reuse the Stripe customer id we persisted on a previous checkout.
      const existing = db.findById("users", session.user.id);
      let customerId = existing?.stripeCustomerId;

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: session.user.email,
          name: session.user.name,
          metadata: { neurix_user_id: session.user.id },
        });
        customerId = customer.id;
        db.update("users", session.user.id, { stripeCustomerId: customerId });
      }

      const origin = req.headers.origin || process.env.NEXTAUTH_URL || "http://localhost:3000";

      const checkout = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: customerId,
        line_items: [{ price: priceId, quantity: 1 }],
        allow_promotion_codes: true,
        billing_address_collection: "auto",
        success_url: `${origin}/billing?status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/billing?status=cancelled`,
        metadata: {
          neurix_user_id: session.user.id,
          plan,
        },
      });

      logger.info("stripe checkout created", {
        userId: session.user.id,
        plan,
        sessionId: checkout.id,
      });

      return res.status(200).json({ url: checkout.url, sessionId: checkout.id });
    },
  },
  { auth: true }
);
