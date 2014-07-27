var request = null;
var response = null;

// Record the current request and response for logging.
module.exports = function(req, res, next) {
  request = req;
  response = res;

  next();
};

process.on("uncaughtException", function(err) {
  console.log(err.stack);

  if (response) {
    response.status(500).send("Uncaught server error.");
    response = null;
  }
});
