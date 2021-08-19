require("dotenv").config();

const jobsProcessor = require("./src/jobsProcessor");
const jobsCreator = require("./src/jobsCreator");

(async () => {
  try {
    const queue = await jobsCreator();

    jobsProcessor(queue);
  } catch (error) {
    console.log(error);
  }
})();
