const fs = require("fs");
const path = require("path");
const express = require("express");
const hbs = require("express3-handlebars");
const bodyParser = require("body-parser");

module.exports = function(server) {
  var host = process.env.HOST;
  var port = process.env.PORT || 8000;
  var publicDir = path.join(__dirname, "../../public");

  if (process.env.NODE_ENV === "production") {
    host = host || "127.0.0.1";
  }
  else if (process.env.NODE_ENV === "development") {
    host = host || "0.0.0.0";

    // Serve static files locally during development..
    server.use("/public", express.static(publicDir));
  }

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({
    extended: true 
  }));

  // Set up the view maagement.
  server.engine('handlebars', hbs({ defaultLayout: "main" }));
  server.set("view engine", "handlebars");

  if (port && host) {
    // Listen on the correct host and port.
    server.listen(port, host);

    // Normalize the port, since it is no longer used after this.
    port = port ? ":" + port : "";

    // Display a helpful output message.
    console.info("Listening on: http://" + host + port);
  }

  return server;
};
