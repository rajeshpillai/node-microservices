const mongoose = require("mongoose");
const MailSchema = require("./models/mail");

module.exports = config => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.mongoURI);

  mongoose.model("Mail", MailSchema);
};
