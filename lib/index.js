const fs = require("fs");
const express = require("express");
const configure = require("./server/configure");
const errorHandling = require("./server/errors");
const Restaurant = require("./models/restaurant");
const restaurantResource = require("./resources/restaurant");

// Create and configure the server.
var server = configure(express());

// Automatically handle exceptions and errors.
server.use(errorHandling);

// Render the homepage as a list.
server.get("/", function(req, res, next) {
  Restaurant.fetch(function(restaurants) {
    res.render("list", {
      restaurants: restaurants.sort(),
      helpers: {
        toStars: require("./helpers/to_stars")
      }
    });
  });
});

// Mount the restaurant resource.
server.use("/restaurant", restaurantResource);

module.exports = server;
