import { redis } from './redis';
import { jobsProcessedCounter, jobProcessingHistogram, jobErrorsCounter } from './metrics';

interface Job {
  id: string;
  createdAt: number;
}

function executeCpuTask(): number {
  const max = 80000;
  const primes: number[] = [];
  for (let i = 2; i <= max; i++) {
    let isPrime = true;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
  }
  return primes.length;
}

export async function processJobs(): Promise<void> {
  while (true) {
    try {
      const res = await redis.blpop('job_queue', 2);
      if (res) {
        const [, rawData] = res;
        const job: Job = JSON.parse(rawData);
        const timer = jobProcessingHistogram.startTimer();

        await redis.set(`job_status:${job.id}`, 'PROCESSING');

        const count = executeCpuTask();

        await redis.set(`job_status:${job.id}`, 'COMPLETED');
        await redis.set(`job_result:${job.id}`, JSON.stringify({ primesFound: count }));
        await redis.incr('total_jobs_completed');

        timer();
        jobsProcessedCounter.inc({ status: 'success' });
      }
    } catch (err) {
      console.error('Worker error:', err);
      jobErrorsCounter.inc();
      jobsProcessedCounter.inc({ status: 'error' });
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}
