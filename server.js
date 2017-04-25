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

 var profile ={
	"email_verified": false,
	"email": "alamgir.bscs2768@iiu.edu.pk",
	"clientID": "xDe229e1uR9PPKZMutFVk4QZYpAVU9l6",
	"updated_at": "2017-04-11T07:22:32.381Z",
	"name": "alamgir.bscs2768@iiu.edu.pk",
	"picture": "https://s.gravatar.com/avatar/d4b22aa23197af9d1c007642f0cb98a9?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fal.png",
	"user_id": "auth0|58ec8436ca4db442d9301a01",
	"nickname": "alamgir.bscs2768",
	"identities": [
		{
			"user_id": "58ec8436ca4db442d9301a01",
			"provider": "auth0",
			"connection": "Username-Password-Authentication",
			"isSocial": false
		}
	],
	"created_at": "2017-04-11T07:22:30.891Z",
	"sub": "auth0|58ec8436ca4db442d9301a01"
};
//connect to mongoose

mongoose.connect("mongodb://localhost/kola");

var db = mongoose.Connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

var user = new User({ name: 'Bob Smith' });

user.save(function (err) {
  if (err) return handleError(err);
});

app.post('/api/user', function(req, res){
  res.json(profile);


	
});

app.get('/api/user', function(req, res){
  res.json(profile);
})

app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "public", "index.html"));
});


app.listen(PORT, function() {
  console.log("Express server is up on port: " + PORT);
});
