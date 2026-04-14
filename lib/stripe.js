import Stripe from "stripe";
import logger from "./logger";

let _stripe = null;

/**
 * Lazy-initialized Stripe client. Returns `null` when STRIPE_SECRET_KEY is
 * not set — callers must handle that case and return a 503 so the app still
 * boots in environments without Stripe credentials (dev, CI, demo).
 */
export function getStripe() {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    logger.warn("stripe: STRIPE_SECRET_KEY missing — billing disabled");
    return null;
  }
  _stripe = new Stripe(key, {
    apiVersion: "2024-06-20",
    typescript: false,
    appInfo: { name: "neurix-ui", version: "1.1.0" },
  });
  return _stripe;
}

export const PLANS = {
  pro: {
    id: "pro",
    name: "Pro",
    priceEnv: "STRIPE_PRICE_PRO",
    amount: 4900,
    currency: "eur",
    interval: "month",
  },
  agency: {
    id: "agency",
    name: "Agency",
    priceEnv: "STRIPE_PRICE_AGENCY",
    amount: 14900,
    currency: "eur",
    interval: "month",
  },
};

export function getPriceId(planId) {
  const plan = PLANS[planId];
  if (!plan) return null;
  return process.env[plan.priceEnv] || null;
}
