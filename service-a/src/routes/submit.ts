import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { redis } from '../redis';

const router = Router();

router.post('/submit', async (_req, res) => {
  try {
    const jobId = uuidv4();
    const jobData = { id: jobId, createdAt: Date.now() };

    await redis.rpush('job_queue', JSON.stringify(jobData));
    await redis.set(`job_status:${jobId}`, 'PENDING');
    await redis.incr('total_jobs_submitted');

    res.status(202).json({ jobId, status: 'QUEUED' });
  } catch (err) {
    console.error('Error submitting job:', err);
    res.status(500).json({ error: 'Failed to submit job' });
  }
});

export default router;
