const nodemailer = require("nodemailer");

const transport_config = {
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
};

const sender = nodemailer.createTransport(transport_config);

const sendEmail = ({ to, subject, content }) => {
  const email = {
    from: process.env.NODEMAILER_AUTH_USER,
    to,
    subject,
    text: content,
  };
  sender.sendMail(email, (error) => {
    if (error) {
      console.log(error);
    }

    console.log(`Email sent successfully to ${to}.`);
  });
};

module.exports = { sendEmail };
