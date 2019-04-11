const server = require("express")();
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const bodyParser = require("body-parser");
const schema = require("./data/schema");

const { syncRequire } = require("module-loader"); // custom loader

const math = syncRequire("http://localhost:9000/math/index.js");

const { port } = require("./config");

server.use(bodyParser.json());
server
  .use(
    "/graphql",
    graphqlExpress({
      schema
    })
  )
  .use(
    "/gq",
    graphiqlExpress({
      endpointURL: "/graphql"
    })
  );

server
  .get("/", (_, res) => {
    console.log(`Adding ${math.add(5, 2)}`);
    res.send("I am working as expected");
  })
  .listen(port, () => console.log(`Server running on port hello ${port}`));
