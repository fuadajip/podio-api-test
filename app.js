const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const Podio = require("podio-js").api;
// use express
const app = express();

require("dotenv").config();
// import router
const router = express.Router();

// instantiate the SDK
const podioCredential = new Podio({
  authType: process.env.GRANT_TYPE,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// get the app ID and Token for appAuthentication
const appId = process.env.APP_ID;
const appToken = process.env.APP_TOKEN;

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/login", (req, res) => {
  podioCredential.authenticateWithApp(appId, appToken, err => {
    if (err) throw new Error(err);

    podioCredential
      .isAuthenticated()
      .then(() => {
        console.log("authenticated");
      })
      .catch(err => console.log(err));
  });
});

app.use("/api", router);

// default route
app.use("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/public/index.html`));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  res.status(404).send("404 Not found");
  next(err);
});

// error handler
app.use(err => {
  console.log(err.stack);
});
module.exports = app;
