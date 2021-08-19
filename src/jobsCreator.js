const axios = require("axios").default;

const { createJob, createQueue } = require("./services/queue.service");

module.exports = async () => {
  const queue = createQueue("mails");

  try {
    const { data } = await axios.get(process.env.CODEBY_VTEX_SEARCH_URL, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const job = createJob(queue, { productsQuantity: data.length });

    job.on("succeeded", () => {
      console.log(`Email's job with id ${job.id} sended.`);
    });
  } catch (error) {
    console.log(error);
  }

  return queue;
};
