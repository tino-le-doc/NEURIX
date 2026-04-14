import { apiHandler } from "@/lib/apiHandler";
import { getStripe } from "@/lib/stripe";
import db from "@/lib/db";

export default apiHandler(
  {
    POST: async (req, res, { session }) => {
      const stripe = getStripe();
      if (!stripe) {
        return res
          .status(503)
          .json({ error: "Facturation non configurée" });
      }

      const user = db.findById("users", session.user.id);
      if (!user?.stripeCustomerId) {
        return res
          .status(400)
          .json({ error: "Aucun abonnement Stripe associé à ce compte" });
      }

      const origin = req.headers.origin || process.env.NEXTAUTH_URL || "http://localhost:3000";
      const portal = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${origin}/billing`,
      });

      return res.status(200).json({ url: portal.url });
    },
  },
  { auth: true }
);
