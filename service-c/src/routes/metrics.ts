import { Router } from 'express';
import { redis } from '../redis';
import { register, queueLengthGauge, totalSubmittedGauge, totalCompletedGauge } from '../metrics';

const router = Router();

router.get('/metrics', async (_req, res) => {
  try {
    const qLen = await redis.llen('job_queue');
    const sub = (await redis.get('total_jobs_submitted')) || 0;
    const comp = (await redis.get('total_jobs_completed')) || 0;

    queueLengthGauge.set(qLen);
    totalSubmittedGauge.set(Number(sub));
    totalCompletedGauge.set(Number(comp));

    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch metrics';
    res.status(500).end(message);
  }
});

export default router;
