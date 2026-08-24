import express from 'express';
import statsRouter from './routes/stats';
import metricsRouter from './routes/metrics';

const app = express();

app.use(statsRouter);
app.use(metricsRouter);

const PORT = Number(process.env.PORT) || 3002;
app.listen(PORT, () => console.log(`Service C Stats running on port ${PORT}`));
