const { PORT } = process.env;
module.exports = {
  port: PORT || 3001,
  mongoURI: "mongodb://127.0.0.1:27017/microservice_db"
};
