const express = require("express");
const connectDB = require("./config/db");
const accessControl = require("./middleware/accessControl");
const app = express();
const path = require("path");

// connect to database
connectDB();

//middleware

// body parser
app.use(express.json({ extended: false }));
// setting up accessControl options
// app.use(accessControl)

// define routes
const routes = ["auth", "posts", "profile", "users"];
routes.map((route) =>
  app.use(`/api/${route}`, require(`./routes/api/${route}`))
);

// serve static assets in production
if ((process.env.NODE_ENV = "production")) {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
