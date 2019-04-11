const http = require("http");

const { syncRequire } = require("../module-loader");

console.log(syncRequire);

//console.log(syncRequire("http://localhost:3000/package.json"));

http
  .get("http://localhost:3000/package.json")
  .on("response", function(response) {
    var body = "";
    var i = 0;
    response.on("data", function(chunk) {
      i++;
      body += chunk;
      console.log("BODY Part: " + i);
    });
    response.on("end", function() {
      console.log(body);
      console.log("Finished");
    });
  });
