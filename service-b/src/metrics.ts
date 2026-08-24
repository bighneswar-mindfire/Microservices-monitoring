import client from 'prom-client';

export const register = new client.Registry();

client.collectDefaultMetrics({ register });

export const jobsProcessedCounter = new client.Counter({
  name: 'jobs_processed_total',
  help: 'Total jobs processed by worker',
  labelNames: ['status'],
});

export const jobProcessingHistogram = new client.Histogram({
  name: 'job_processing_time_seconds',
  help: 'Time taken to process job in seconds',
  buckets: [0.1, 0.5, 1, 2, 5],
});

export const jobErrorsCounter = new client.Counter({
  name: 'job_errors_total',
  help: 'Total job errors encountered',
});

register.registerMetric(jobsProcessedCounter);
register.registerMetric(jobProcessingHistogram);
register.registerMetric(jobErrorsCounter);
