const { sendEmail } = require("./services/email.service");

module.exports = (queue) => {
  queue.process((job) => {
    console.log(`Processing job ${job.id}`);

    sendEmail({
      to: "lustepe@live.com",
      subject: "Codeby VTEX Store Products",
      content: `Quantidade de produtos na loja = ${job.data.productsQuantity}`,
    });
  });
};
