var express = require("express");
var path = require("path");
var http = require("http");
// Create our app
var app = express();

const mongoose = require("mongoose");
const jwt = require("express-jwt");
const cors = require("cors");
const bodyParser = require("body-parser");
var router = express.Router();
// var User = require("./server/models/User.js");
// var Friendships = require("./server/models/Friendships.js");
// var Events = require("./server/models/Events.js");
// var rooms = require("./server/models/groupList.js");

var server = require("http").Server(app);

var expressSession = require("express-session");
var cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;
server.listen(PORT);

mongoose.connect("mongodb://localhost/kola");

var db = mongoose.Connection;

// must use cookieParser before expressSession
// var mongo = require("mongodb");
var fs = require("fs");
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

const authCheck = jwt({
  secret: "AUTH0_CLIENT_SECRET",
  audience: "AUTH0_CLIENT_ID "
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

var api = require("./server/api/api.js")(app);
var io = require("./server/events/realtime.js")(server);




