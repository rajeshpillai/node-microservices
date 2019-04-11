const mongoose = require("mongoose");
const Mail = mongoose.model("Mail");

const mailHandler = async ({ body: { subject, receiver, content } }, res) => {
  let error;

  if (!subject || !receiver || !content) {
    res.sendStatus(400).send({
      message: "you forgot  some keys",
      service: "database_service",
      status: 400,
      payload: null
    });
  }
  let mail = new Mail({
    subject,
    receiver,
    content
  });

  try {
    mail = await mail.save();
  } catch (err) {
    error = err;
  }
  res.send({
    message: "message from DB",
    service: "database_service",
    status: 200,
    payload: mail || error
  });
};

module.exports = server => {
  server.post("/mails", mailHandler);
};
