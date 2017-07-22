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
var User = require("./server/models/User.js");
var Friendships = require("./server/models/Friendships.js");
var Events = require("./server/models/Events.js");
var rooms = require("./server/models/groupList.js");
// var server = require("http").Server(app);
// var io = require("socket.io")(server);

var server = require("http").Server(app);
var io = require("socket.io")(server);
var multer = require("multer");

let user_id_server;
var myuserid;
var expressSession = require("express-session");
var cookieParser = require("cookie-parser"); // the session is stored in a cookie, so we use this to parse it
var users, connections, room;
users = [];
connections = [];
const PORT = process.env.PORT || 3000;
server.listen(PORT);

//connect to mongoose
// session.startSession(req, res, callback);

mongoose.connect("mongodb://localhost/kola");

var db = mongoose.Connection;

// must use cookieParser before expressSession
var upload = multer({ dest: "./uploads" });
var mongo = require("mongodb");
var Grid = require("gridfs-stream");
Grid.mongo = mongo;
var fs = require("fs");

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

app.get("/", function(req, res) {
  //Sets name=express
});

app.post("/api/user", function(req, res) {
  // console.log(req.body)
  var user = new User(req.body);
  user.obj = req.body;
  user_id_server = req.body.user_id;
  myuserid = req.body.user_id;
  // res.cookie('name', 'express').send('cookie set'); //Sets name=express
  res.cookie("name", "express");
  console.log("logging /"); //Sets name=express
  //   console.log(req.cookie);
  req.session.userId = req.body.user_id;

  user.uId = req.body.identities[0].user_id;
  User.find({ user_id: req.params.user_id }, function(err, docs) {
    if (docs.length) {
      // cb('Name exists already',null);
      console.log("abc");
    } else {
      user.save(function(err) {
        if (err) {
          console.log("user exists");
          //  return handleError(err);
        }
      });
    }
  });
});

app.post("/file/send", function(req, res, next) {
  console.log(req.body);
  //   gfs = Grid(db);
  //   console.log(req.files);
  //   var ss = req.files;
  //   for (var j = 0; j < ss.length; j++) {
  //     var originalName = ss[j].originalname;
  //     var filename = ss[j].filename;
  //     var writestream = gfs.createWriteStream({
  //       filename: originalName
  //     });
  //     fs.createReadStream("./uploads/" + filename).pipe(writestream);
  //   }
});
app.post("/upload", function(req, res) {
  console.log("req.files"); // the uploaded file object
  console.log(req.files); // the uploaded file object
  console.log(req); // the uploaded file object
  //   gfs = Grid(db);
  //   console.log(req.files);
  //   var ss = req.files;
  //   for (var j = 0; j < ss.length; j++) {
  //     var originalName = ss[j].originalname;
  //     var filename = ss[j].filename;
  //     var writestream = gfs.createWriteStream({
  //       filename: originalName
  //     });
  //     fs.createReadStream("./uploads/" + filename).pipe(writestream);
  //   }
});

app.post("/api/user/friendrequest", function(req, res) {
  // console.log(req.body)
  var friendship = new Friendships(req.body);
  //console.log(req.body);

  Friendships.find({}, function(err, docs) {
    //         if (docs.length){
    // console.log('friendship exists');
    //         }else{
    friendship.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
    //}
  });
});

app.post("/api/user/createevent", function(req, res) {
  // console.log(req.body)
  var events = new Events(req.body);
  //console.log(req.body);
  //console.log(req.body.date);
  Events.find({}, function(err, docs) {
    //         if (docs.length){
    // console.log('friendship exists');
    //         }else{
    events.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
});

app.post("/api/user/removefriend", function(req, res) {
  // console.log("removing friend");
  // console.log(req.body);
  // console.log(req.body.user_id);

  Friendships.findOne(
    {
      user_id: req.body.user_id,
      other_id: req.body.other_id,
      status: "friend"
    },
    function(error, friendship) {
      console.log("This object will get deleted ");

      console.log(friendship);
      // friendship.remove();
    }
  );
});
app.post("/api/deleteEvent", function(req, res) {
  // console.log(req.body._id);

  Events.findOne(
    {
      _id: req.body._id
    },
    function(error, event) {
      console.log("This object will get deleted ");
      if (event == null || event == undefined) {
        console.log(event);
      } else {
        console.log(event);

        event.remove();
      }
    }
  );
});

app.post("/api/user/changedesc", function(req, res) {
  // console.log("changing desc");
  // console.log(req.body);
  // console.log(req.body.desc);
  // console.log(req.body.user_id);

  User.findOneAndUpdate(
    { user_id: req.body.user_id },
    { $set: { desc: req.body.desc } },
    { upsert: true },
    function(err, doc) {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      doc.update({});
      console.log(doc);
    }
  );
});

app.post("/api/user/emailnotif", function(req, res) {
  // console.log("emailnotif");
  // console.log(req.body);

  User.findOneAndUpdate(
    { user_id: req.body.user_id },
    { $set: { emailnotif: req.body.emailnotif } },
    { upsert: true },
    function(err, doc) {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      // doc.update({});
      //  console.log(doc);
    }
  );
});
//}

//Routes
// app.get('/app', function(req, res) {
//     res.sendfile(__dirname + '/public/index.html');
// });
// app.post("/api/user/myuserid", function(req, res) {
//   var myuserid = req.body.id;
//   console.log("myuserid server");
//   console.log(myuserid);
// });

app.post("/api/createGroup", function(req, res) {
  // console.log(req.body.groupname);
  // console.log(req.body.avatarletter);
  let _id;
  var data = {
    groupname: req.body.groupname,
    avatarletter: req.body.avatarletter,
    conversation: [],
    participants: req.body.mapping
  };
  var room = new rooms(data);

  rooms.find({}, function(err, docs) {
    // if (docs.length) {
    //   console.log("friendship exists");
    // }
    // else {
    room.save(function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        _id = docs._id;
        // console.log("docs");
        // console.log(docs);
        // console.log(docs._id);

        //        console.log("_id" + _id);
        var participants = JSON.parse(req.body.mapping);
        // console.log("a");
        // console.log(participants);
        // console.log(participants.length);
        for (var i = 0; i < participants.length; i++) {
          //  User.find({user_id: participants[i]._user_id}, function(err, docs) {
          // if (docs.length) {
          //   console.log("friendship exists");
          // }
          // else {
          //  console.log("aski id" + _id);
          User.update(
            { user_id: participants[i].user_id },
            {
              $push: {
                rooms: {
                  roomId: _id,
                  roomName: req.body.groupname,
                  pic: req.body.avatarletter
                }
              }
            },
            function(err) {
              if (err) console.log("This is errro " + err);
              else {
                console.log("Successful...!");

                // User.find({ user_id: data.id }, function(err, docs) {
                //   socket.emit("renderListChat", docs);
                // });
              }
            }
          );
        }
      }
    });
  });
});

app.post("/api/user/acceptrequestadd", function(req, res) {
  var status = req.body.status;
  // console.log("status: ");
  // console.log(status);
  // console.log(req.body.id);

  Friendships.findOne({ other_id: req.body.id }, function(err, friendship) {
    if (!err) {
      if (!friendship) {
        friendship = new Friendships();
        friendship.status = status;
      }
      friendship.status = status;

      friendship.save(function(err) {
        if (!err) {
          console.log("done");
        } else {
          console.log("Error: could not save");
        }
      });
    }
  });

  // Friendships.findOneAndUpdate({other_id: req.body.id}, {$set:{status:"friend"}}, {upsert: true}, function(err, doc){
  //     if(err){
  //         console.log("Something wrong when updating data!");
  //     }

  //     console.log(doc);
  // });
});

app.get("/api/userall", function(req, res) {
  User.find({}, function(err, users) {
    var userMap = {};
    res.send(users);
  });
});

app.get("/api/getEvents", function(req, res) {
  Events.find({}).sort({ date: "desc" }).exec(function(err, events) {
    res.send(events);
  });

  // Events.find({}, function(err, events) {
  //   res.send(events);
  // });
});
app.get("/api/user/friendrequest", function(req, res) {
  Friendships.find({}, function(err, friendship) {
    res.send(friendship);
  });
});

app.get("/api/user/acceptrequest", function(req, res) {
  Friendships.find({ status: "pending", other_id: myuserid }, function(
    err,
    friendship
  ) {
    res.send(friendship);
  });
});
// app.get("/api/user/friendlist", function(req, res) {
//   Friendships.find({ status: "friend", other_id: myuserid }, function(
//     err,
//     friendship
//   ) {
//     res.send(friendship);
//   });
// });

app.get("/api/user/friendList", function(req, res) {
  Friendships.find(
    {
      $or: [
        { status: "friend", other_id: myuserid },
        { status: "friend", user_id: myuserid }
      ]
    },
    function(err, friendship) {
      res.send(friendship);
    }
  );
});
app.get("/api/user/groupList", function(req, res) {
  rooms.find({}, function(err, rooms) {
    res.send(rooms);
  });
});
app.get("/api/user/friendlist", function(req, res) {
  Friendships.find().or([
    { $and: [{ status: "friend" }, { other_id: myuserid }] },
    { $and: [{ status: "friend" }, { user_id: myuserid }] }
  ]), function(err, friendship) {
    res.send(JSON.stringify(friendship));
  };
});

app.get("/api/userbyuId/:uId", function(req, res) {
  // get the user's verified from the url and find that user
  mongoose.model("User").find({ uId: req.params.uId }, function(err, User) {
    if (err) console.log(err);
    res.send(JSON.stringify(User));
  });
});

app.get("/api/user/:uId", function(req, res) {
  // console.log(":uId is executed");
  // get the user's verified from the url and find that user
  //  console.log("This is req.params id " + req.params.uId);
  mongoose.model("User").find({ user_id: req.params.uId }, function(err, User) {
    if (err) console.log(err);
    if (JSON.stringify(User)) {
      //console.log("Not found");
    }
    res.send(JSON.stringify(User));
    //  console.log("THis is in uId " + JSON.stringify(User));
  });
});
app.get("/api/user/:roomId", function(req, res) {
  // get the user's verified from the url and find that user
  //console.log("This is req.params id in room" + req.params.roomId);
  rooms.find({ _id: req.params.roomId }, function(err, rooms) {
    if (err) {
      console.log("There is an error");
    } else {
      // console.log("These are rooms from database " + rooms);
      res.send(rooms);
    }
  });
});

app.get("/api/user/:user_id", function(req, res) {
  // get the user's verified from the url and find that user
  console.log(": is executed");
  mongoose
    .model("User")
    .find({ user_id: req.params.user_id }, function(err, User) {
      if (err) console.log(err);
      res.send(JSON.stringify(User));
    });
});
app.get("/api/rooms/:roomId", function(req, res) {
  // console.log(req.body);

  rooms.find({ _id: req.params.roomId }, function(err, room) {
    if (err) {
      console.log("There is an error");
    } else {
      // console.log("returning room");
      //  console.log(room);

      res.send(room);
    }
  });
});

app.get("/api/user", function(req, res) {
  //console.log("no one is executed");
  mongoose.model("User").find(function(err, User) {
    res.send(JSON.stringify(User));
    // console.log('THis is in no one '+ JSON.stringify(User));
  });
});

app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

io.on("connection", function(socket) {
  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);

  //Disconnect
  socket.on("disconnect", function(data) {
    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnected: %s sockets connected", connections.length);
  });

  socket.on("send message", function(data) {
    // console.log("This is socket.usernmae " + socket.username);
    // console.log("This is your message to save " + data.msg);
    // console.log("This is room id in send message " + data.roomId);

    var d = new Date(); // for now
    d.getHours(); // => 9
    d.getMinutes(); // =>  30
    d.getSeconds(); // => 51
    //console.log(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    date = mm + "/" + dd + "/" + yyyy;
    rooms.update(
      { _id: data.roomId },
      {
        $push: {
          conversation: {
            from: socket.username,
            message: data.msg,
            favourite: false,
            date: date,
            time: time,
            picture: data.picture
          }
        }
      },
      function(err) {
        if (err) console.log("This is errro " + err);
        else {
          console.log("Successful...!");
        }
      }
    );

    socket.emit("new message", {
      username: socket.username,
      msg: data,
      pic: socket.picture
    });
  });

  socket.on("Join room", function(data) {
    room = data;
    console.log("THis is room name " + room);
    // io.sockets.in(data).emit('roomMsg', data);
    // console.log(socket.rooms[0]);
  });
  socket.on("pushingMsg", function(data) {
    socket.join("room", function() {
      console.log("This is socket.id " + socket.id);
      console.log(" now in rooms ", socket.rooms);
      var name = room;
      console.log(" now in rooms ", socket.rooms.room);
      io.sockets.in(socket.rooms.room).emit("roomMsg", data);
    });
  });
  socket.on("addingnotes", function(data) {
    socket.join("room", function() {
      console.log("This is socket.id " + socket.id);
      console.log(" now in rooms ", socket.rooms);
      var name = room;
      console.log(" now in rooms ", socket.rooms.room);
      io.sockets.in(socket.rooms.room).emit("roomNotes", data);
    });
  });
  socket.on("addnote", function(data) {
    // console.log("add notes");
    // console.log(data);
    rooms.update(
      { _id: data.roomId },
      {
        $push: {
          notes: {
            from: data.from,
            text: data.text,
            date: data.date,
            time: data.time
          }
        }
      },
      function(err) {
        if (err) console.log("This is errro " + err);
        else {
          console.log("Successful...!");
        }
      }
    );
  });

  socket.on("individualnote edit", function(data) {
    // console.log("add notes");
    console.log(data);

    rooms
      .findOneAndUpdate(
        {
          _id: data.roomId,
          "notes._id": data._id
        },
        {
          $set: {
            "notes.$.text": data.newnote
          }
        }
      )
      .then(() => {
        console.log("Success! new note saved");
        // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
      })
      .catch(err => {
        console.log("err", err.stack);
      });
  });

  socket.on("favourite msg", function(data) {
    console.log(data);

    rooms
      .findOneAndUpdate(
        {
          _id: data.roomId,
          "conversation._id": data._id
        },
        {
          $set: {
            "conversation.$.favourite": data.star
          }
        }
      )
      .then(() => {
        console.log("Success! msg favourited");
        rooms.find({ _id: data.roomId }, function(err, docs) {
          //   var a = docs.from;
          //   console.log(docs.from);
          //   b = a.split(/\s(.+)/)[0]; //everything before the first space
          //   // Users.firstname = b;
          socket.emit("remainingmsgs", docs);
        });

        // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
      })
      .catch(err => {
        console.log("err", err.stack);
      });
  });
  socket.on("read sync", function(data) {
    console.log(data);

    User.find({
      user_id: data
    })
      .then(docs => {
        console.log("Success! unread sync");

        socket.emit("sync success", docs);

        // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
      })
      .catch(err => {
        console.log("err", err.stack);
      });
  });

  socket.on("readcount send", function(data) {
    console.log(data.count.length);

    // User.findOneAndUpdate(
    //   {
    //     user_id: data.user_id,
    //     "rooms.roomId": data._id
    //   },
    //   {
    //     $set: {
    //       "rooms.$.total_count": data.count.length + 1
    //     }
    //   }
    // )
    //   .then(docs => {
    //     console.log("Success! count saved");
    //     //   console.log(docs);
    //     // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
    //   })
    //   .catch(err => {
    //     console.log("err", err.stack);
    //   });

    for (var i = 0; i < data.participants.length; i++) {
      if (data.user_id == data.participants[i].user_id) {
        User.findOneAndUpdate(
          {
            user_id: data.participants[i].user_id,
            "rooms.roomId": data._id
          },
          {
            $set: {
              "rooms.$.total_count": data.count.length + 1,
              "rooms.$.read_count": data.count.length + 1
            }
          }
        )
          .then(docs => {
            console.log("Success! count saved");
            //   console.log(docs);
            // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
          })
          .catch(err => {
            console.log("err", err.stack);
          });
      } else {
        User.findOneAndUpdate(
          {
            user_id: data.participants[i].user_id,
            "rooms.roomId": data._id
          },
          {
            $set: {
              "rooms.$.total_count": data.count.length + 1
            }
          }
        )
          .then(docs => {
            console.log("Success! count saved");
            //   console.log(docs);
            // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
          })
          .catch(err => {
            console.log("err", err.stack);
          });
      }
    }
  });

  socket.on("room leave", function(data) {
    // console.log("add notes");
    console.log(data);

    User.findOneAndUpdate(
      {
        user_id: data.user_id
        // ,
        // "rooms._id": data.roomId
      },
      { $pull: { rooms: { _id: data.roomId } } }
    )
      .then(docs => {
        User.find({ user_id: data.user_id }, function(err, docs) {
          //   var a = docs.from;
          //   console.log(docs.from);
          //   b = a.split(/\s(.+)/)[0]; //everything before the first space
          //   // Users.firstname = b;
          socket.emit("remaininggroups", docs);
        });

        // console.log("docs");
        // console.log(docs);
        // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
      })
      .catch(err => {
        console.log("err", err.stack);
      });
  });

  socket.on("newdata", function(data) {
    // console.log("add notes");
    console.log(data);

    User.find({
      user_id: data
    }).then(docs => {
      socket.emit("remainingchatlist", docs);
    });
    // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
  });
  socket.on("msg delete", function(data) {
    // console.log("add notes");
    console.log(data);

    rooms
      .findOneAndUpdate(
        {
          _id: data.roomId
        },
        { $pull: { conversation: { _id: data._id } } }
      )
      .then(docs => {
        // console.log("docs");
        //console.log(docs);
        rooms.find({ _id: data.roomId }, function(err, docs) {
          //   var a = docs.from;
          //   console.log(docs.from);
          //   b = a.split(/\s(.+)/)[0]; //everything before the first space
          //   // Users.firstname = b;
          socket.emit("remainingmsgs", docs);
        });
        // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
      })
      .catch(err => {
        console.log("err", err.stack);
      });
  });

  socket.on("note delete", function(data) {
    // console.log("add notes");
    console.log(data);

    rooms
      .findOneAndUpdate(
        {
          _id: data.roomId
        },
        { $pull: { notes: { _id: data._id } } }
      )
      .then(docs => {
        // console.log(docs);
        rooms.find({ _id: data.roomId }, function(err, docs) {
          //   var a = docs.from;
          //   console.log(docs.from);
          //   b = a.split(/\s(.+)/)[0]; //everything before the first space
          //   // Users.firstname = b;
          socket.emit("remainingnotes", docs);
        });
      })
      .catch(err => {
        console.log("err", err.stack);
      });

    rooms.find({ _id: data.roomId }, function(err, docs) {
      //   var a = docs.from;
      //   console.log(docs.from);
      //   b = a.split(/\s(.+)/)[0]; //everything before the first space
      //   // Users.firstname = b;
      socket.emit("remainingnotes", docs);
    });
  });

  socket.on("add user", function(data) {
    //console.log("This is data for add user " + data);
    socket.username = data.userrealname;
    socket.picture = data.obj.picture;
    //console.log("This is picture " + socket.picture);
    // users.push(socket.username);
    users.push({ id: socket.id, username: data, pic: data.picture });
  });
  socket.on("roomId", function(data) {
    //console.log("THis is data coming from roomId " + data);
    rooms.find({ _id: data }, function(err, rooms) {
      if (err) {
        console.log("There is an error");
      } else {
        socket.emit("msgs", { msg: rooms[0].conversation });
        // res.send(rooms);
      }
    });
  });
  socket.on("gettingnotes", function(data) {
    //console.log("THis is data coming from roomId " + data);
    rooms.find({ _id: data }, function(err, rooms) {
      if (err) {
        console.log("There is an error");
      } else {
        console.log("THis is response " + rooms[0].notes);
        socket.emit("catching notes", rooms[0].notes);
      }
    });
  });

  socket.on("readcountmsg", function(data) {
    console.log("readcountmsg");
    // console.log(data.count);
    console.log(data.participants);
    User.findOneAndUpdate(
      {
        user_id: data.user_id,
        "rooms._id": data._id
      },
      {
        $set: {
          "rooms.$.read_count": data.count
        }
      }
    )
      .then(docs => {
        console.log("Success! count saved");
        //console.log(docs);
        // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
      })
      .catch(err => {
        console.log("err", err.stack);
      });

    // for (var i = 0; i < data.participants.length; i++) {
    //   User.findOneAndUpdate(
    //     {
    //       user_id: data.participants[i].user_id,
    //       "rooms.roomId": data._id
    //     },
    //     {
    //       $set: {
    //         "rooms.$.total_count": data.count.length + 1
    //       }
    //     }
    //   )
    //     .then(docs => {
    //       console.log("Success! count saved");
    //       //   console.log(docs);
    //       // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
    //     })
    //     .catch(err => {
    //       console.log("err", err.stack);
    //     });
    // }
  });
  socket.on("timetable", function(data) {
    //console.log("THis is data coming from roomId " + data);
    console.log("data.id" + data);
    User.find({ user_id: data }, function(err, user) {
      if (err) {
        console.log("There is an error");
      } else {
        console.log("timetable");
        // console.log(user);
        console.log(JSON.stringify(user[0].timetable[0].day[0]));
      }
    });
  });
  socket.on("note map", function(data) {
    // console.log("THis is data coming from roomId " + data);
    rooms.find({ _id: data }, function(err, rooms) {
      if (err) {
        console.log("There is an error");
      } else {
        socket.emit("dbnotes", { dbnotes: rooms[0].notes });
        // res.send(rooms);
      }
    });
  });

  // socket.on("calculate conversations", function(data) {
  //   // console.log("THis is data coming from roomId " + data);
  //   let final = [];

  //   for (var i = 0; i < data.length; i++) {
  //     rooms.find({ _id: data[i] }, function(err, rooms) {
  //       if (err) {
  //         console.log("There is an error");
  //       } else {
  //         // console.log("rooms[0].conversation.length");
  //         //  console.log(rooms[0].conversation);
  //         // final[i]= ;
  //         final[i] = rooms[0].conversation.length;
  //         console.log(final.length);
  //         if (final.length - 1 == data.length) {
  //           console.log("nechay wlifinal");
  //           //    console.log(final);

  //           socket.emit("calculated conversations", {
  //             final: final
  //           });
  //         } else {
  //         }
  //       }
  //     });
  //   }
  // socket.emit(
  //   "calculated conversations",
  //   {
  //     // dbnotes: rooms[0].conversation.length
  //   }
  //);
  // });
  socket.on("createpnotes", function(data) {
    console.log("Creating pnotes");
    console.log(JSON.stringify(data.desc));
    User.update(
      { _id: data.id },
      {
        $push: {
          privatenotes: {
            title: data.title,
            desc: data.desc,
            notes: []
          }
        }
      },
      function(err) {
        if (err) console.log("This is errro " + err);
        else {
          console.log("Successful...!");
        }
      }
    );
  });
  socket.on("gettingpnotes", function(data) {
    console.log("inside creating notes " + data);
    User.find({ _id: data }, function(err, notes) {
      if (err) {
        console.log("There is an error" + err);
      } else {
        console.log("THis is gettingnotes " + notes[0].privatenotes);
        socket.emit("addingpnotes", notes[0].privatenotes);
      }
    });
  });
  socket.on("addingprivatenotes", function(data) {
    console.log("inside adding notes " + JSON.stringify(data));
    console.log("inside adding notes " + JSON.stringify(data));
    User.update(
      { _id: data.id },
      {
        $push: {
          privatenotes: {
            $push: {
              notes: data.data
            }
          }
        }
      },
      function(err) {
        if (err) console.log("This is errro " + err);
        else {
          console.log("Successful...!");
        }
      }
    );
  });
  socket.on("sending", function(data) {
    // console.log("THis is data coming from roomId " + data);
    rooms.find({ _id: data }, function(err, rooms) {
      if (err) {
        console.log("There is an error");
      } else {
        socket.emit("returnmsgs", { msg: rooms[0].conversation });
        // res.send(rooms);
      }
    });
  });

  socket.on("retrieve msgs", function(data) {
    // console.log("THis is data coming from roomId " + data);
    rooms.find({ _id: data.roomId }, function(err, rooms) {
      if (err) {
        //  console.log("There is an error");
      } else {
        console.log("docs retrieve msgs");
        console.log(rooms);
        socket.emit("chat msgs", rooms);
        // res.send(rooms);
      }
    });
  });

  function updateUsernames() {
    io.sockets.emit("get users", users);
  }
});
