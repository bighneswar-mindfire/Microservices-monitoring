import { Router } from 'express';
import { redis } from '../redis';

const router = Router();

router.get('/status/:id', async (req, res) => {
  try {
    const status = await redis.get(`job_status:${req.params.id}`);
    const result = await redis.get(`job_result:${req.params.id}`);

    if (!status) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ jobId: req.params.id, status, result: result ? JSON.parse(result) : null });
  } catch (err) {
    console.error('Error fetching status:', err);
    res.status(500).json({ error: 'Error fetching status' });
  }
});

export default router;
