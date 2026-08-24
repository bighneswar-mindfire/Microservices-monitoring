import { Router } from 'express';
import { redis } from '../redis';

const router = Router();

router.get('/stats', async (_req, res) => {
  try {
    const queueLength = await redis.llen('job_queue');
    const submitted = Number((await redis.get('total_jobs_submitted')) || 0);
    const completed = Number((await redis.get('total_jobs_completed')) || 0);
    const totalProcessingTime = Number((await redis.get('total_processing_time_seconds')) || 0);
    const avgProcessingTimeSeconds = completed > 0 ? totalProcessingTime / completed : 0;

    res.json({ queueLength, submitted, completed, avgProcessingTimeSeconds });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
