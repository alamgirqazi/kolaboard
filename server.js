var express = require("express");
var path = require("path");
// Create our app
var app = express();
const mongoose = require("mongoose");
const jwt = require("express-jwt");
const cors = require("cors");
const bodyParser = require("body-parser");
var router = express.Router();
var User = require('./server/models/User.js')


//connect to mongoose

mongoose.connect("mongodb://localhost/kola");

var db = mongoose.Connection;

// app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
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

const PORT = process.env.PORT || 3000;

// var user = new User({ name: 'Bob Smith' });

// user.save(function (err) {
//   if (err) return handleError(err);
// });

app.post('/api/user', function(req, res){
console.log(req.body) 
var user = new User(req.body);
user.obj = req.body;
console.log(user.email);


user.save(function (err) {
  if (err) return handleError(err);
});

	
});

// app.get('/api/user', function(request, response){
//   console.log(response.body);
	
// 	// res.json(res);
// })

app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "public", "index.html"));
});


app.listen(PORT, function() {
  console.log("Express server is up on port: " + PORT);
});
