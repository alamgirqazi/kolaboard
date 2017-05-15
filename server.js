var express = require("express");
var path = require("path");
var http = require('http');
// Create our app
var app = express();

const mongoose = require("mongoose");
const jwt = require("express-jwt");
const cors = require("cors");
const bodyParser = require("body-parser");
var router = express.Router();
var User = require('./server/models/User.js')
var server = require('http').Server(app);
var io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT);

//connect to mongoose

mongoose.connect("mongodb://localhost/kola");

var db = mongoose.Connection;

    //some other code
// app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
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


app.post('/api/user', function(req, res){
// console.log(req.body) 
var user = new User(req.body);
user.obj = req.body;
user.uId = req.body.identities[0].user_id;
console.log('uId' + user.uId);

 User.find({user_id : req.params.user_id}, function (err, docs) {
        if (docs.length){
            // cb('Name exists already',null);
console.log('abc');
        }else{
            user.save(function(err){

            if (err)
            {
             console.log('user exists')
            //  return handleError(err);
            }
            });
        }
    });

	
});


app.get('/api/userall', function(req, res) {
  User.find({}, function(err, users) {
    var userMap= {};

    // users.forEach(function(user, index) {
    //   userMap[user._id] = user.user_id;
    //   // userMap["email"] = user.email;
    //   // userMap["picture"] = user.picture;
    //   // userMap["user_id"] = user.user_id;
    //   // userMap[user._id] = user.name;
  
  
    // });
    res.send(users);  
  });
});



app.get('/api/userbyuId/:uId', function(req, res) {
    // get the user's verified from the url and find that user
   mongoose.model('User').find({uId: req.params.uId}, function(err, User){
        if(err) console.log(err)
  res.send(JSON.stringify(User));
    });
});

app.get('/api/user/:user_id', function(req, res) {
    // get the user's verified from the url and find that user
   mongoose.model('User').find({user_id: req.params.user_id}, function(err, User){
        if(err) console.log(err)
  res.send(JSON.stringify(User));
    });
});


app.get('/api/user', function(req, res){
mongoose.model('User').find(function(err,User)
{

  res.send(JSON.stringify(User));
}
)
	
});



app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "public", "index.html"));
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
// app.listen(PORT, function() {
//   console.log("Express server is up on port: " + PORT);
// });
