after(function() {
  delete process.env.NODE_ENV;
  delete require.cache[require.resolve("../lib/index")];
});
