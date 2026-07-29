import express from 'express';
import submitRouter from './routes/submit';
import statusRouter from './routes/status';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.send('OK'));

app.use(submitRouter);
app.use(statusRouter);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => console.log(`Service A running on port ${PORT}`));
