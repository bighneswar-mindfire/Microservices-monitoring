import client from 'prom-client';

export const register = new client.Registry();

export const queueLengthGauge = new client.Gauge({
  name: 'queue_length',
  help: 'Current number of jobs in Redis queue',
});

export const totalSubmittedGauge = new client.Gauge({
  name: 'total_jobs_submitted',
  help: 'Total submitted jobs count',
});

export const totalCompletedGauge = new client.Gauge({
  name: 'total_jobs_completed',
  help: 'Total completed jobs count',
});

register.registerMetric(queueLengthGauge);
register.registerMetric(totalSubmittedGauge);
register.registerMetric(totalCompletedGauge);
