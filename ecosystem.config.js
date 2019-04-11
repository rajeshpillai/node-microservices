const path = require("path");
const basePath = path.join(__dirname, "/packages");
module.exports = {
  apps: [
    {
      name: "gateway",
      script: basePath + "/gateway/server.js",
      watch: true,
      env: {
        PORT: 3000,
        SERVICE_DB_PORT: 3001
      }
    },
    {
      name: "db Service",
      script: basePath + "/database_service/server.js",
      watch: true,
      env: {
        PORT: 3001
      }
    }
  ]
};
