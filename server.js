var express = require("express");
// Create our app
var app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

var server = require("http").Server(app);

var expressSession = require("express-session");
var cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;
server.listen(PORT);

mongoose.connect("mongodb://localhost/kola");

// must use cookieParser before expressSession
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
app.use(function(req, res, next) {
  if (req.headers["x-forwarded-proto"] === "https") {
    res.redirect("http://" + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static("public"));
app.use(cookieParser());

app.use(
  expressSession({
    secret: "somesecrettokenhere",
    saveUninitialized: false,
    name: "mycookie",
    resave: false,
    cookie: {
      secure: false,
      maxAge: 6000000
    }
  })
);


require("./server/api/api.js")(app);
require("./server/events/realtime.js")(server);




