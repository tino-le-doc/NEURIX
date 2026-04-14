import { apiHandler } from "@/lib/apiHandler";
import db from "@/lib/db";

const COLLECTION = "billing_events";

function summarize(events) {
  const total = events.reduce((sum, e) => sum + (e.amount || 0), 0);
  const byService = events.reduce((acc, e) => {
    acc[e.service] = (acc[e.service] || 0) + (e.amount || 0);
    return acc;
  }, {});
  return { total, byService, count: events.length };
}

export default apiHandler(
  {
    GET: async (_req, res, { session }) => {
      const events = db.findAll(
        COLLECTION,
        (e) => e.userId === session.user.id
      );
      return res.status(200).json({
        events,
        summary: summarize(events),
      });
    },
  },
  { auth: true }
);
