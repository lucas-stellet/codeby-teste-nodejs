const Queue = require("bee-queue");

const createQueue = (queueName) => {
  const queueConfig = {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      auth_pass: process.env.REDIS_PASSWORD,
    },
  };

  return new Queue(queueName, queueConfig);
};

const createJob = (queue, jobData) => {
  const job = queue.createJob(jobData);

  job.retries(process.env.JOBS_RETRIES).save();

  return job;
};

module.exports = { createQueue, createJob };
