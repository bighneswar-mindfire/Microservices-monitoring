import express from 'express';
import healthRouter from './routes/health';
import metricsRouter from './routes/metrics';
import { processJobs } from './worker';

const app = express();

app.use(healthRouter);
app.use(metricsRouter);

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  console.log(`Worker Service B running on port ${PORT}`);
  processJobs();
});
