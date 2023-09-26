const parse_v = (e, req) => {
    const keys = Object.keys(e.errors);
    keys.forEach((key) => {
      req.flash("error", key + ": " + e.errors[key].properties.message);
    });
  };
  app.use(require("./middleware/storeLocals"));
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/session", require("./routes/sessionRoutes"));
  
  module.exports = parse_v;
  