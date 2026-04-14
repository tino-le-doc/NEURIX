import { apiHandler } from "@/lib/apiHandler";
import { jobSchema } from "@/lib/validators";
import db from "@/lib/db";
import { runJob } from "@/lib/ai";
import logger from "@/lib/logger";

const COLLECTION = "jobs";

export default apiHandler(
  {
    GET: async (req, res, { session }) => {
      const { status, model, projectId } = req.query;
      const rows = db.findAll(COLLECTION, (job) => {
        if (job.ownerId !== session.user.id && session.user.role !== "admin") {
          return false;
        }
        if (status && job.status !== status) return false;
        if (model && job.model !== model) return false;
        if (projectId && job.projectId !== projectId) return false;
        return true;
      });
      return res.status(200).json({ jobs: rows });
    },

    POST: async (req, res, { session }) => {
      const data = jobSchema.parse(req.body);

      // Persist first so the client always gets a job id even if execution
      // fails later (failed jobs are still visible in the history).
      const job = db.create(COLLECTION, {
        ...data,
        ownerId: session.user.id,
        status: "running",
        cost: 0,
        durationSec: 0,
      });

      try {
        const result = await runJob({ model: data.model, prompt: data.prompt });
        const updated = db.update(COLLECTION, job.id, {
          status: "completed",
          cost: result.usage?.costUsd || 0,
          durationSec: Math.round((result.durationMs || 0) / 1000),
          output: result.output,
          usage: result.usage,
          provider: result.provider,
        });

        // Record a billing event so /api/billing totals stay in sync.
        if (result.usage?.costUsd) {
          db.create("billing_events", {
            userId: session.user.id,
            service: `job:${data.model}`,
            amount: result.usage.costUsd,
            description: data.title,
          });
        }

        return res.status(201).json({ job: updated });
      } catch (err) {
        const failed = db.update(COLLECTION, job.id, {
          status: "failed",
          error: err.message,
        });
        logger.warn("job failed", { jobId: job.id, message: err.message });
        return res.status(502).json({ job: failed, error: err.message });
      }
    },
  },
  { auth: true }
);
