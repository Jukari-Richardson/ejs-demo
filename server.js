var express = require("express");
var app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const session = require("express-session");
const taskRouter = require("./routes/tasks");
const setMessage = require("./middleware/message");
const user = require("./models/user");
const { name } = require("ejs");
const User = require("./models/user");

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(require("flash")());
app.use(express.urlencoded({ extended: false }));
app.use("/tasks", taskRouter);

// use res.render to load up an ejs view file

// index page
app.get("/", async function (req, res) {
  try {
    // Fetch a user, for example by finding one based on a condition (here we're finding the first user)
    const user = await User.findOne();

    // Additional data for rendering the page
    const mascots = [
      { name: "Sammy", organization: "DigitalOcean", birth_year: 2012 },
      { name: "Tux", organization: "Linux", birth_year: 1996 },
      { name: "Moby Dock", organization: "Docker", birth_year: 2013 },
    ];
    const tagline = "No programming concept is complete without a cute animal mascot.";

    // Render the EJS template, passing the user data and additional data to the template
    res.render("pages/index", { user: user, mascots: mascots, tagline: tagline });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// app.get("/", async (req, res) => {
//   try {
//     // Fetch a user, for example by finding one based on a condition (here we're finding the first user)
//     const user = await User.findOne();

//     // Render the EJS template, passing the user data to the template
//     res.render("partials/header", { user: user });
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });


// about page
app.get("/about", function (req, res) {
  res.render("pages/about");
});

const port = 8080;
const start = async () => {
  try {
    await require("./db/connect")(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
