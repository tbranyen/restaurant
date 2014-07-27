const express = require("express");
const Restaurant = require("../../models/restaurant");

// Create a new resource endpoint.
var resource = express();

// Create a new restaurant.
resource.post("/", function(req, res) {
  Restaurant.fetch(function(restaurants) {
    Restaurant.update(req.body, function() {
      res.redirect("/");
    });
  });
});

// Get information about a specific restaurant.
resource.get("/:name", function(req, res) {
  Restaurant.fetch(function(restaurants) {
    res.render("detail", {
      restaurant: restaurants.findByName(req.params.name),
      helpers: {
        toStars: require("../../helpers/to_stars")
      }
    });
  });
});

// Like a restaurant.
resource.get("/:name/like", function(req, res) {
  Restaurant.fetch(function(restaurants) {
    Restaurant.like(req.params.name, function() {
      res.redirect("/restaurant/" + req.params.name);
    });
  });
});

// Dislike a restaurant.
resource.get("/:name/dislike", function(req, res) {
  Restaurant.fetch(function(restaurants) {
    Restaurant.dislike(req.params.name, function() {
      res.redirect("/restaurant/" + req.params.name);
    });
  });
});

module.exports = resource;
