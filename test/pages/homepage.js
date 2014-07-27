const supertest = require("supertest-as-promised");
const server = require("../../lib/index");

describe("Homepage", function() {
  var mock = supertest(server);

  it("responds to the endpoint", function() {
    return mock.get("/").expect(200);
  });
});
