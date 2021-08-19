const Queue = require("bee-queue");

const createQueue = (queueName) => {
  const queueConfig = {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      db: process.env.REDIS_DB,
      options: { password: process.env.REDIS_PASSWORD },
    },
    removeOnSuccess: true,
  };

  return new Queue(queueName, queueConfig);
};

const createJob = (queue, jobData, job) => {
  const job = queue.createJob(jobData);

  job.retries(process.env.JOBS_RETRIES).save();

  job.on("succeeded", () => {
    console.log(`Email's job with id ${job.id} sended.`);
  });
};

module.exports = { createQueue, createJob };
