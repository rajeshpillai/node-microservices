const server = require("express")();
const bodyParser = require("body-parser");

const config = require("./config");
const { port } = config;
server.use(bodyParser.json());

require("./dbutil")(config);
require("./routes/get")(server);
require("./routes/post")(server);

server.listen(port, () => console.log(`Server running on port ${port}`));
