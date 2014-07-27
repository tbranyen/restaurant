const assert = require("assert");
const supertest = require("supertest-as-promised");
const server = require("../../lib/index");
const fixture = require("../fixtures/restaurants.json");

describe("Restaurant", function() {
  var mock = supertest(server);

  it("can GET a specific restaurant", function() {
    return mock.get("/restaurant/McDonalds").expect(200);
  });
});
