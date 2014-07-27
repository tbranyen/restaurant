const fs = require("fs");
const path = require("path");

function calculateRating(likes, dislikes) {
  var gauge = (likes / (likes + dislikes)) * 100;

  if (gauge >= 90)
    return 5;
  else if (gauge >= 75)
    return 4;
  else if (gauge >= 60)
    return 3;
  else if (gauge >= 45)
    return 2;
  else if (gauge >= 30)
    return 1;
  else
    return 0;
}

module.exports = {
  src: path.join(__dirname, "../../data/restaurants.json"),

  fetch: function(callback) {
    var model = this;

    fs.readFile(this.src, function(err, contents) {
      model.value = JSON.parse(contents.toString());
      callback(model);
    });
  },

  save: function(callback) {
    fs.writeFile(this.src, JSON.stringify(this.value, null, 2), callback);
  },

  update: function(obj, callback) {
    var update = this.findByName(obj.name);

    // Defaults.
    if (!update) {
      obj.rating = 3;
      obj.likes = 0;
      obj.dislikes = 0;

      this.value.push(obj);
    }
    // Updates.
    else {
      update.likes = obj.likes;
      update.dislikes = obj.dislikes;
      update.rating = calculateRating(obj.likes, obj.dislikes);
    }

    // Save the models.
    this.save(callback);
  },

  like: function(name, callback) {
    var obj = this.findByName(name);
    obj.likes += 1;
    this.update(obj, callback);
  },

  dislike: function(name, callback) {
    var obj = this.findByName(name);
    obj.dislikes += 1;
    this.update(obj, callback);
  },

  sort: function() {
    return this.value.sort(function(a, b) {
      return a.rating < b.rating;
    });
  },

  findByName: function(name) {
    return this.value.filter(function(restaurant) {
      return restaurant.name === name;
    })[0];
  }
};
