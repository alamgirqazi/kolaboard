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
var upload = multer({ dest: "public/uploads/" });
var mongo = require("mongodb");
var Grid = require("gridfs-stream");
Grid.mongo = mongo;
var fs = require("fs");
var router = express.Router();

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

// router.post("/saveBlog", upload.any(), function(req, res, next) {
//   console.log(req.body, "Body");
//   console.log(req.files, "files");
//   res.end();
// });
// router.post("/app", upload.any(), function(req, res, next) {
//   console.log(req.files);
//   res.send(req.files);
// });
app.post("/api/user", function(req, res) {
  // console.log(req.body)
  var user = new User(req.body);
  user.obj = req.body;
  user_id_server = req.body.user_id;
  myuserid = req.body.user_id;
  // res.cookie('name', 'express').send('cookie set'); //Sets name=express
  res.cookie("name", "express");
  // console.log("logging /"); //Sets name=express
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
          // console.log("user exists");
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

app.post("/api/createGroup", function(req, res) {
  console.log("createGroup", req.body);
  let _id;
  var data = {
    groupname: req.body.groupname,
    avatarletter: req.body.avatarletter,
    conversation: [],
    participants: JSON.parse(req.body.mapping),
    admin_id: req.body.id
  };
  var room = new rooms(data);

  rooms.find({}, function(err, docs) {
    room.save(function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        _id = docs._id;

        var participants = JSON.parse(req.body.mapping);
        var val = 0;
        for (var i = 0; i < participants.length; i++) {
          User.findOneAndUpdate(
            { user_id: participants[i].user_id },
            {
              $push: {
                rooms: {
                  roomId: _id,
                  roomName: req.body.groupname,
                  pic: req.body.avatarletter,
                  read_notes_count: val,
                  read_count: val,
                  total_count: val,
                  total_notes_count: val
                }
              }
            },
            function(err) {
              if (err) console.log("This is errro " + err);
              else {
                console.log("create event! updated in all users");
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
  Friendships.findOneAndUpdate(
    {
      user_id: req.body.uid,
      other_id: req.body.user_id,
      status: "pending"
    },
    {
      $set: {
        status: status
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
  socket.on("chat message", function(data) {
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
  });
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
    // console.log("data.sendTo");
    // console.log(data.sendTo);

    var msg = {
      from: socket.username,
      message: data.msg,
      favourite: false,
      date: date,
      time: time,
      picture: data.picture
    };
    socket.broadcast.emit("chat messagey", msg);
    // io.emit("chat messagey", msg);
    console.log("emitted");
  });
  // socket.on("refreshpnotes", function(data) {
  //   User.find({_id:data.id }, function(err,docs)
  // {

  // })
  // socket.broadcast.to(socket.id).emit("refreshedpnotes", docs);
  // });

  socket.on("Join room", function(data) {
    room = data;
    //  console.log("THis is room name " + room);
    // io.sockets.in(data).emit('roomMsg', data);
    // console.log(socket.rooms[0]);
  });

  socket.on("recieving msgs", function(data) {
    rooms.find({ _id: data }, function(err, docs) {
      socket.emit("remaining msgs", docs);
      socket.broadcast.to(socket.id).emit("Message for my own", docs);
    });
  });
  socket.on("notesadding", function(data) {
    rooms.find({ _id: data.roomId }, function(err, docs) {
      // socket.emit("remaining msgs", docs);
      socket.broadcast.to(socket.id).emit("Note for my own", docs);
    });
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

  socket.on("add User to Group", function(data) {
    var d = new Date(); // for now
    d.getHours(); // => 9
    d.getMinutes(); // =>  30
    d.getSeconds(); // => 51
    //console.log(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
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
    var date = mm + "/" + dd + "/" + yyyy;
    rooms.update(
      { _id: data.roomId },
      {
        $push: {
          remainparticipants: {
            user_id: data.user_id,
            picture: data.picture,
            name: data.name
          }
        }
      },
      function(err, docs) {
        if (err) console.log("This is errro " + err);
        else {
          rooms.find({ _id: data.roomId }, function(err, docs) {
            // console.log(docs);
            socket.emit("returning participants", docs);
          });

          rooms.update(
            { _id: data.roomId },
            {
              $push: {
                conversation: {
                  from: data.name,
                  message: data.message,
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
                rooms.find({ _id: data.roomId }, function(err, docs) {
                  // console.log(docs);
                  socket.emit("returning message group", docs);
                });
              }
              let val = 0;
              // User.findOneAndUpdate({user_id: data.user_id},
              User.findOneAndUpdate(
                { user_id: data.user_id },
                {
                  $push: {
                    rooms: {
                      roomId: data.roomId,
                      roomName: data.roomName,
                      pic: data.pic,
                      read_notes_count: val,
                      read_count: val,
                      total_count: data.msgs_count,
                      total_notes_count: data.notes_count
                    }
                  }
                },
                function(err) {
                  if (err) console.log("This is errro " + err);
                  else {
                    console.log("user added Mashallah");
                  }
                }
              );
            }
          );

          rooms.update(
            { _id: data.roomId },
            {
              $push: {
                participants: {
                  user_id: data.user_id,
                  picture: data.picture,
                  name: data.name
                }
              }
            },
            function(err, docs) {
              if (err) console.log("This is errro " + err);
              else {
                console.log("pariciapnts added");
              }
            }
          );
        }
      }
    );
  });
  socket.on("remove User from Group", function(data) {
    var d = new Date(); // for now
    d.getHours(); // => 9
    d.getMinutes(); // =>  30
    d.getSeconds(); // => 51
    //console.log(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
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
    var date = mm + "/" + dd + "/" + yyyy;
    rooms.findOneAndUpdate(
      { _id: data.roomId },
      { $pull: { remainparticipants: { user_id: data.user_id } } },
      function(err, docs) {
        if (err) console.log("This is errro " + err);
        else {
          // console.log("docs");
          // console.log(docs);

          rooms.find({ _id: data.roomId }, function(err, docs) {
            // console.log(docs);
            socket.emit("returning participants", docs);
          });
          let val = 0;
          rooms.update(
            { _id: data.roomId },
            {
              $push: {
                conversation: {
                  from: data.from,
                  message: data.message,
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
                rooms.find({ _id: data.roomId }, function(err, docs) {
                  // console.log(docs);
                  socket.emit("returning message group", docs);
                });

                // User.findOneAndUpdate({user_id: data.user_id},
                User.findOneAndUpdate(
                  {
                    user_id: data.user_id
                    // ,
                    // "rooms._id": data.roomId
                  },
                  { $pull: { rooms: { roomId: data.roomId } } }
                )
                  .then(docs => {
                    // console.log(docs);
                  })
                  .catch(err => {
                    console.log("err", err.stack);
                  });
              }
            }
          );
        }
      }
    );
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
          // console.log("Successful...!");
          socket.broadcast.emit("note messagey", {
            from: data.from,
            text: data.text,
            date: data.date,
            time: data.time
          });
        }
      }
    );
  });

  socket.on("individualnote edit", function(data) {
    // console.log("add notes");
    // console.log(data);

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
        rooms.find({ _id: data.roomId }, function(err, docs) {
          //   var a = docs.from;
          //   console.log(docs.from);
          //   b = a.split(/\s(.+)/)[0]; //everything before the first space
          //   // Users.firstname = b;
          // socket.broadcast.emit("Savenotes", docs);
          // socket.broadcast.to(socket.id).emit("Savenotes", docs);
          socket.broadcast.emit("Savenotes", docs);

          // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
        });
      })
      .catch(err => {
        console.log("err", err.stack);
      });
  });

  socket.on("favourite msg", function(data) {
    //  console.log(data);

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
    // console.log(data);

    User.find({
      user_id: data
    })
      .then(docs => {
        // console.log("Success! unread sync");

        socket.emit("sync success", docs);

        // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
      })
      .catch(err => {
        console.log("err", err.stack);
      });
  });

  socket.on("readcount send", function(data) {
    //  console.log(data.count.length);

    for (var i = 0; i < data.participants.length; i++) {
      if (data.user_id == data.participants[i].user_id) {
        User.findOneAndUpdate(
          {
            user_id: data.participants[i].user_id,
            "rooms.roomId": data._id
          },
          {
            $set: {
              "rooms.$.total_count": data.count,
              "rooms.$.read_count": data.count,
              "rooms.$.total_notes_count": data.notescount,
              "rooms.$.read_notes_count": data.notescount
            }
          }
        )
          .then(docs => {
            console.log("Success! count saved readcount");
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
              "rooms.$.total_count": data.count
            }
          }
        )
          .then(docs => {
            console.log("Success! count saved else readcount");
            //   console.log(docs);
            // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
          })
          .catch(err => {
            console.log("err", err.stack);
          });
      }
    }
  });
  socket.on("readcount delete", function(data) {
    //  console.log(data.count.length);

    for (var i = 0; i < data.participants.length; i++) {
      if (data.user_id == data.participants[i].user_id) {
        User.findOneAndUpdate(
          {
            user_id: data.participants[i].user_id,
            "rooms.roomId": data._id
          },
          {
            $set: {
              "rooms.$.total_count": data.count - 1,
              "rooms.$.read_count": data.count - 1
            }
          }
        )
          .then(docs => {
            console.log("Success! message counts saved for deletion");
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
              "rooms.$.total_count": data.count - 1,
              "rooms.$.read_count": data.count - 1
            }
          }
        )
          .then(docs => {
            console.log("Success! message counts saved for deletion");
            //   console.log(docs);
            // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
          })
          .catch(err => {
            console.log("err", err.stack);
          });
      }
    }
  });

  socket.on("readnotes send", function(data) {
    console.log(data.count.length);

    for (var i = 0; i < data.participants.length; i++) {
      if (data.user_id == data.participants[i].user_id) {
        User.findOneAndUpdate(
          {
            user_id: data.participants[i].user_id,
            "rooms.roomId": data._id
          },
          {
            $set: {
              "rooms.$.total_notes_count": data.count.length,
              "rooms.$.read_notes_count": data.count.length
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
              "rooms.$.total_notes_count": data.count.length
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
  socket.on("readnotes edit", function(data) {
    // console.log(data.count.length);

    for (var i = 0; i < data.participants.length; i++) {
      if (data.user_id == data.participants[i].user_id) {
        User.findOneAndUpdate(
          {
            user_id: data.participants[i].user_id,
            "rooms.roomId": data._id
          },
          {
            $set: {
              "rooms.$.total_notes_count": data.count.length,
              "rooms.$.read_notes_count": data.count.length
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
              "rooms.$.total_notes_count": data.count.length,
              "rooms.$.read_notes_count": data.count.length - 1
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
  socket.on("readnotes delete", function(data) {
    console.log(data.count.length);

    for (var i = 0; i < data.participants.length; i++) {
      if (data.user_id == data.participants[i].user_id) {
        User.findOneAndUpdate(
          {
            user_id: data.participants[i].user_id,
            "rooms.roomId": data._id
          },
          {
            $set: {
              "rooms.$.total_notes_count": data.count.length - 1,
              "rooms.$.read_notes_count": data.count.length - 1
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
              "rooms.$.total_notes_count": data.count.length - 1,
              "rooms.$.read_notes_count": data.count.length - 1
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
    // console.log(data);

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
          socket.emit("remaininggroups", docs);
        });
      })
      .catch(err => {
        console.log("err", err.stack);
      });
  });

  socket.on("newdata", function(data) {
    // console.log("add notes");
    // console.log(data);

    User.find({
      user_id: data
    }).then(docs => {
      socket.emit("remainingchatlist", docs);
    });
    // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
  });
  socket.on("create group event", function(data) {
    let _id;
    var mydata = {
      groupname: data.groupname,
      avatarletter: data.avatarletter,
      conversation: [],
      participants: JSON.parse(data.mapping),
      remainparticipants: JSON.parse(data.mapping),
      admin_id: data.id,
      created_on: data.created_on
    };
    var room = new rooms(mydata);

    rooms.find({}, function(err, docs) {
      room.save(function(err, docs) {
        if (err) {
          console.log(err);
        } else {
          _id = docs._id;

          var participants = JSON.parse(data.mapping);
          var val = 0;
          for (var i = 0; i < participants.length; i++) {
            User.findOneAndUpdate(
              { user_id: participants[i].user_id },
              {
                $push: {
                  rooms: {
                    roomId: _id,
                    roomName: data.groupname,
                    pic: data.avatarletter,
                    read_notes_count: val,
                    read_count: val,
                    total_count: val,
                    total_notes_count: val
                  }
                }
              },
              function(err) {
                if (err) console.log("This is errro " + err);
                else {
                  console.log("create event! updated in all users");
                }
              }
            );
          }
        }
      });
    });
    User.find({
      user_id: data.id
    }).then(docs => {
      console.log("event");
      socket.emit("refresh group list", docs);
    });
    // console.log("add notes");
    // console.log(data);
    // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
  });
  socket.on("msg delete", function(data) {
    // console.log("add notes");
    // console.log(data);

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
    // console.log(data);

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
  socket.on("unfriend user", function(data) {
    // console.log(data);
    // console.log(data.user_id);
    // console.log(data.other_id);
    //console.log("THis is data coming from roomId " + data);
    Friendships.findOneAndRemove(
      {
        $or: [
          { user_id: data.other_id, other_id: data.user_id, status: "friend" },
          { user_id: data.user_id, other_id: data.other_id, status: "friend" }
        ]
      },
      function(err, rooms) {
        if (err) {
          console.log("There is an error");
        } else {
          // console.log(rooms);
          Friendships.find(
            {
              $or: [
                { status: "friend", other_id: data.user_id },
                { status: "friend", user_id: data.user_id }
              ]
            },
            function(err, friendship) {
              // res.send(friendship);
              socket.emit("return remain users", friendship);
            }
          );
          User.find({}, function(err, users) {});
          //     console.log("to be removed ");
          //     console.log(rooms); // res.send(rooms);
        }
      }
    );
  });
  socket.on("unfriend friendlist", function(data) {
    // console.log("unfriend");
    // console.log(data);

    // console.log("data");

    Friendships.findOneAndRemove(
      {
        $or: [
          { user_id: data.user_id, other_id: data.other_id, status: "friend" },
          { user_id: data.other_id, other_id: data.user_id, status: "friend" }
        ]
      },
      function(err, rooms) {
        if (err) {
          console.log("There is an error");
        } else {
          // console.log(rooms); // res.send(rooms);
        }
      }
    );
  });
  socket.on("Show Favourites", function(data) {
    //console.log("THis is data coming from roomId " + data);
    rooms.find({ _id: data }, function(err, rooms) {
      if (err) {
        console.log("There is an error in group ID");
      } else {
        socket.emit("returned favs", { msg: rooms[0].conversation });
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
    // console.log("readcountmsg");
    // // console.log(data.count);
    // console.log(data.notescount);
    // console.log(data.participants);
    User.findOneAndUpdate(
      {
        user_id: data.user_id,
        "rooms._id": data._id
      },
      {
        $set: {
          "rooms.$.read_count": data.count,
          "rooms.$.read_notes_count": data.notescount
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

  socket.on("HandleOpen", function(data) {
    // console.log(data);
    if (data.currentFunction == "M") {
      User.findOneAndUpdate(
        {
          user_id: data.user_id,
          "timetable.day.id": data.id
        },
        {
          $set: {
            "timetable.day.$.M": data.value
          }
        }
      )
        .then(docs => {
          User.find({
            user_id: data.user_id
          }).then(docs => {
            // console.log("user find");
            // console.log(docs);
            socket.emit("timetable", docs);
          });
        })
        .catch(err => {
          console.log("err", err.stack);
        });
    } else if (data.currentFunction == "T") {
      User.findOneAndUpdate(
        {
          user_id: data.user_id,
          "timetable.day.id": data.id
        },
        {
          $set: {
            "timetable.day.$.T": data.value
          }
        }
      )
        .then(docs => {
          User.find({
            user_id: data.user_id
          }).then(docs => {
            User.find({
              user_id: data.user_id
            }).then(docs => {
              // console.log("user find");
              // console.log(docs);
              socket.emit("timetable", docs);
            });
            // console.log("user find");
            // console.log(docs);
            // socket.emit("timetable", docs);
          });

          // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
        })
        .catch(err => {
          console.log("err", err.stack);
        });
    } else if (data.currentFunction == "W") {
      User.findOneAndUpdate(
        {
          user_id: data.user_id,
          "timetable.day.id": data.id
        },
        {
          $set: {
            "timetable.day.$.W": data.value
          }
        }
      )
        .then(docs => {
          User.find({
            user_id: data.user_id
          }).then(docs => {
            // console.log("user find");
            // console.log(docs);
            socket.emit("timetable", docs);
          });
          // console.log("Success! handleOpen saved");
          // console.log("docs");
          // console.log(docs);
          // socket.emit("timetable", docs);

          // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
        })
        .catch(err => {
          console.log("err", err.stack);
        });
    } else if (data.currentFunction == "Th") {
      User.findOneAndUpdate(
        {
          user_id: data.user_id,
          "timetable.day.id": data.id
        },
        {
          $set: {
            "timetable.day.$.Th": data.value
          }
        }
      )
        .then(docs => {
          User.find({
            user_id: data.user_id
          }).then(docs => {
            // console.log("user find");
            // console.log(docs);
            socket.emit("timetable", docs);
          });
          // console.log("Success! handleOpen saved");
          // console.log("docs");
          // console.log(docs);
          // socket.emit("timetable", docs);
          // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
        })
        .catch(err => {
          console.log("err", err.stack);
        });
    } else if (data.currentFunction == "F") {
      User.findOneAndUpdate(
        {
          user_id: data.user_id,
          "timetable.day.id": data.id
        },
        {
          $set: {
            "timetable.day.$.F": data.value
          }
        }
      )
        .then(docs => {
          User.find({
            user_id: data.user_id
          }).then(docs => {
            // console.log("user find");
            // console.log(docs);
            socket.emit("timetable", docs);
          });
          console.log("Success! handleOpen saved");
          // console.log("docs");
          // console.log(docs);
          // socket.emit("timetable", docs);

          // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
        })
        .catch(err => {
          console.log("err", err.stack);
        });
    } else if (data.currentFunction == "S") {
      User.findOneAndUpdate(
        {
          user_id: data.user_id,
          "timetable.day.id": data.id
        },
        {
          $set: {
            "timetable.day.$.S": data.value
          }
        }
      )
        .then(docs => {
          console.log("Success! handleOpen saved");
          User.find({
            user_id: data.user_id
          }).then(docs => {
            // console.log("user find");
            // console.log(docs);
            socket.emit("timetable", docs);
          }); // socket.emit("timetable", docs);

          // console.log("docs");
          // console.log(docs);
          // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
        })
        .catch(err => {
          console.log("err", err.stack);
        });
    } else if (data.currentFunction == "Su") {
      User.findOneAndUpdate(
        {
          user_id: data.user_id,
          "timetable.day.id": data.id
        },
        {
          $set: {
            "timetable.day.$.Su": data.value
          }
        }
      )
        .then(docs => {
          // socket.emit("timetable", docs);
          User.find({
            user_id: data.user_id
          }).then(docs => {
            // console.log("user find");
            // console.log(docs);
            socket.emit("timetable", docs);
          });
          // console.log("Success! handleOpen saved");
          // console.log("docs");
          // console.log(docs);
          // socket.emit("dbnotes", { dbnotes: rooms[0].notes });
        })
        .catch(err => {
          console.log("err", err.stack);
        });
    }
  });

  socket.on("createpnotes", function(data) {
    // console.log("Creating pnotes");
    // console.log(JSON.stringify(data.desc));
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
    // console.log("inside creating notes " + data);
    User.find({ _id: data }, function(err, notes) {
      if (err) {
        console.log("There is an error" + err);
      } else {
        // console.log("THis is gettingnotes " + notes[0].privatenotes);
        socket.emit("addingpnotes", notes[0].privatenotes);
      }
    });
  });
  socket.on("addingprivatenotes", function(data) {
    User.update(
      { _id: data.id, "privatenotes._id": data.folder },
      {
        $push: {
          "privatenotes.$.notes": data.data
        }
      },
      function(err, docs) {
        if (err) console.log("This is errro " + err);
        else {
          console.log("Successful...!");
          User.find({ _id: data.id }, function(err, _user) {
            if (err) {
              console.log(err);
            } else {
              // console.log(_user);
              socket.emit("refreshprinotes", _user);
            }
          });
        }
      }
    );
  });

  socket.on("retrieve msgs", function(data) {
    // console.log("THis is data coming from roomId " + data);
    rooms.find({ _id: data.roomId }, function(err, rooms) {
      if (err) {
        //  console.log("There is an error");
      } else {
        // console.log("docs retrieve msgs");
        // console.log(rooms);
        socket.emit("chat msgs", rooms);
        // res.send(rooms);
      }
    });
  });

  socket.on("deleteFolder", function(data) {
    User.findOneAndUpdate(
      {
        _id: data.id
        // ,
        // "rooms._id": data.roomId
      },
      { $pull: { privatenotes: { _id: data.note._id } } }
    )
      .then(docs => {
        User.find({ _id: data.id }, function(err, docs) {
          socket.emit("remainingpnotes", docs);
        });
      })
      .catch(err => {
        console.log("err", err.stack);
      });
  });
  socket.on("editingInsideNote", function(data) {
    console.log(" eventhit");
    User.findOne({ _id: data.id }, function(err, doc) {
      // console.log(doc);
      if (err) console.log(err);
      else {
        // var pushData = {
        //   title: data.note,
        //   time: data.time,
        //   date: data.date
        // };
        // console.log(doc);
        console.log("eventE");
        // console.log(doc.privatenotes.length);
        for (var i = 0; i < doc.privatenotes.length; i++) {
          if (doc.privatenotes[i]._id == data.folderId) {
            for (var j = 0; j < doc.privatenotes[i].notes.length; j++) {
              // console.log("length", doc.privatenotes[i].notes.length);
              if (doc.privatenotes[i].notes[j]._id == data.noteId) {
                doc.privatenotes[i].notes[j].title = data.note;
                // console.log("found match server yersss");
              }
            }
            // console.log("found match server");
          }
        }
        User.update(
          { _id: data.id },
          { $set: { privatenotes: doc.privatenotes } },
          { new: true },
          function(err, doc) {
            if (err) console.log(err);
            else {
              User.find(
                { _id: data.id, "privatenotes._id": data.folderId },
                function(err, docs) {
                  if (err) {
                    console.log(err);
                  } else {
                    // console.log(docs.privatenotes[0].notes);
                    socket.emit("editedPnotes", docs);
                  }
                }
              );
            }
          }
        );
      }
      // if (doc) {
      //   //use a for loop over doc.replies to find the index(index1) of ObjectId("53dd4b67f0f23cad267f9d8b") at replies[index]._id
      //   var index1;
      //   for (var i = 0; i < doc.privatenotes.length; i++) {
      //     if (doc.privatenotes[i]._id == data.folderId) {
      //       index1 = i;
      //       break;
      //     }
      //   }
      //   var index2;
      //   //use a for loop over doc.replies[index1].to and find the index(index2) of "UserA" at replies[index1].to[index2]
      //   for (var j = 0; j < doc.privatenotes[index1].notes.length; j++) {
      //     if (doc.privatenotes[index1].notes[j]._id == data.noteId) {
      //       index2 = j;
      //       break;
      //     }
      //   }
      //   // console.log("This is index1", index1);
      //   // console.log("This is index2", index2);
      //   if (data.note == "" || data.note == undefined || data.note == null) {
      //     // doc.privatenotes[index1].notes[index2].title = " ";
      //   } else {
      //     console.log(index1);
      //     console.log(index2);

      //     doc.privatenotes[index1].notes[index2].title = data.note;
      //   }
      // console.log("Title");
      // console.log(doc.privatenotes[index1].notes[index2].title);
      // console.log(doc.privatenotes);

      // doc.markModified('privatenotes')
      // User.save(function(err, doc2)
      // {
      //   if(err)
      //   {
      //     console.log(err)
      //   } else {
      //   console.log("successfull ",doc2);
      // } })
    });
  });
  socket.on("deletepnote", function(data) {
    // console.log(data);
    User.findOne({ _id: data.id }, function(err, doc) {
      // console.log(doc);
      if (err) console.log(err);
      else {
        console.log("eventDelete");
        // console.log(doc.privatenotes.length);
        // var k = doc.privatenotes;
        for (var i = 0; i < doc.privatenotes.length; i++) {
          if (doc.privatenotes[i]._id == data.folder) {
            console.log("found folder");
            for (var j = 0; j < doc.privatenotes[i].notes.length; j++) {
              console.log("searching notes");

              // console.log("length", doc.privatenotes[i].notes.length);
              if (doc.privatenotes[i].notes[j]._id == data.noteId) {
                doc.privatenotes[i].notes.splice(j, 1);
              }
            }
          }
        }
        User.update(
          { _id: data.id },
          { $set: { privatenotes: doc.privatenotes } },
          { new: true },
          function(err, doc) {
            if (err) console.log(err);
            else {
              User.find({ _id: data.id }, function(err, docs) {
                if (err) {
                  console.log(err);
                } else {
                  // console.log(docs.privatenotes[0].notes);
                  console.log("emiting result");
                  socket.emit("editedDnotes", docs);
                }
              });
            }
          }
        );
      }
    });
  });
  socket.on("renameFolder", function(data) {
    console.log("THis is folder name in renaming" + data.note.title);
    // User.findOneAndUpdate({
    //         user_id: data.id,
    //         "privaten notes._id": data.notes._id
    //     }, {
    //         $set: {
    //             "privatenotes.$.title": data.value
    //         }
    //     })
    //     .then(docs => {
    //         User.find({
    //             user_id: data.user_id
    //         }).then(docs => {
    //             console.log("user find");
    //             console.log(docs);
    //             socket.emit("timetable", docs);
    //         });
    //     })
    //     .catch(err => {
    //         console.log("err", err.stack);
    //     });
  });
  // socket.on("manipulate group", function(data) {
  //     // console.log("THis is data coming from roomId " + data);
  //     var d = new Date(); // for now
  //     d.getHours(); // => 9
  //     d.getMinutes(); // =>  30
  //     d.getSeconds(); // => 51
  //     //console.log(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
  //     time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  //     var today = new Date();
  //     var dd = today.getDate();
  //     var mm = today.getMonth() + 1; //January is 0!
  //     var yyyy = today.getFullYear();

  //     if (dd < 10) {
  //         dd = "0" + dd;
  //     }
  //     if (mm < 10) {
  //         mm = "0" + mm;
  //     }
  //     date = mm + "/" + dd + "/" + yyyy;
  //     rooms.update({ _id: data.roomId }, {
  //             $push: {
  //                 conversation: {
  //                     from: data.user_name,
  //                     message: data.message,
  //                     favourite: false,
  //                     date: date,
  //                     time: time
  //                 }
  //             }
  //         },
  //         function(err) {
  //             if (err) console.log("This is errro " + err);
  //             else {
  //                 console.log("Successful...!");
  //                 // console.log(data.user_id);
  //                 // rooms.find(
  //                 //   {
  //                 //     _id: data.roomId,
  //                 //     "participants0].$.user_id": data.user_id
  //                 //   },
  //                 //   // {
  //                 //   //   $push: {
  //                 //   //     conversation: {
  //                 //   //       from: data.user_name,
  //                 //   //       message: data.message,
  //                 //   //       favourite: false,
  //                 //   //       date: date,
  //                 //   //       time: time
  //                 //   //     }
  //                 //   //   }
  //                 //   // }

  //                 //   function(err, docs) {
  //                 //     if (err) console.log("This is errro " + err);
  //                 //     else {
  //                 //       console.log(docs);
  //                 //     }
  //                 //   }
  //                 // );
  //             }
  //         }
  //     );
  // });

  socket.on("manipulate group", function(data) {
    rooms.update(
      { _id: data.roomId },
      {
        $push: {
          conversation: {
            from: data.from,
            message: data.message,
            favourite: false,
            date: data.date,
            time: data.time,
            picture: data.picture
          }
        }
      },
      function(err) {
        if (err) console.log("This is errro " + err);
        else {
          console.log("Successful...!");
          rooms.findOneAndUpdate(
            { _id: data.roomId },
            { $pull: { remainparticipants: { user_id: data.user_id } } },
            function(err, docs) {
              if (err) console.log("This is errro " + err);
              else {
                // console.log("docs");
                // console.log(docs);
              }
            }
          );
        }
      }
    );
    // console.log("THis is data coming from roomId " + data);
  });

  // rooms.find({ _id: data.roomId }, function(err, rooms) {
  //   if (err) {
  //     //  console.log("There is an error");
  //   } else {
  //     console.log("docs retrieve msgs");
  //     console.log(rooms);
  //     socket.emit("chat msgs", rooms);
  //     // res.send(rooms);
  //   }
  //  });

  function updateUsernames() {
    io.sockets.emit("get users", users);
  }
});
