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
var expressSession = require("express-session");
var cookieParser = require("cookie-parser"); // the session is stored in a cookie, so we use
var User = require("./server/models/User.js");
var Friendships = require("./server/models/Friendships.js");
var Events = require("./server/models/Events.js");
var rooms = require("./server/models/groupList.js");

var server = require("http").Server(app);
var io = require("socket.io")(server);

let user_id_server;
var myuserid;
var expressSession = require("express-session");
var cookieParser = require("cookie-parser");
var users, connections, room;
users = [];
connections = [];
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

app.get("/", function(req, res) {});

app.post("/api/user", function(req, res) {
  var user = new User(req.body);
  user.obj = req.body;
  user_id_server = req.body.user_id;
  myuserid = req.body.user_id;
  res.cookie("name", "express");
  req.session.userId = req.body.user_id;
  user.uId = req.body.identities[0].user_id;
  User.find({ user_id: req.params.user_id }, function(err, docs) {
    if (docs.length) {
    } else {
      user.save(function(err) {
        if (err) {
        }
      });
    }
  });
});

app.post("/api/user/friendrequest", function(req, res) {
  var friendship = new Friendships(req.body);

  Friendships.find({}, function(err, docs) {
    friendship.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
});

app.post("/api/user/createevent", function(req, res) {
  var events = new Events(req.body);
  Events.find({}, function(err, docs) {
    events.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
});

app.post("/api/user/removefriend", function(req, res) {
  Friendships.findOne(
    {
      user_id: req.body.user_id,
      other_id: req.body.other_id,
      status: "friend"
    },
    function(error, friendship) {
      console.log(error);
    }
  );
});
app.post("/api/deleteEvent", function(req, res) {
  Events.findOne(
    {
      _id: req.body._id
    },
    function(error, event) {
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
  User.findOneAndUpdate(
    { user_id: req.body.user_id },
    { $set: { desc: req.body.desc } },
    { upsert: true },
    function(err, doc) {
      if (err) {
        console.log(err);
      }
      doc.update({});
    }
  );
});

app.post("/api/user/emailnotif", function(req, res) {
  User.findOneAndUpdate(
    { user_id: req.body.user_id },
    { $set: { emailnotif: req.body.emailnotif } },
    { upsert: true },
    function(err, doc) {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.post("/api/createGroup", function(req, res) {
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
              if (err) console.log(err);
              else {
                console.log(err);
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
    .then(() => {})
    .catch(err => {
      console.log(err.stack);
    });
});

app.get("/api/userall", function(req, res) {
  User.find({}, function(err, users) {
    var userMap = {};
    res.send(users);
  });
});

app.get("/api/getEvents", function(req, res) {
  Events.find({})
    .sort({ date: "desc" })
    .exec(function(err, events) {
      res.send(events);
    });
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
  ]),
    function(err, friendship) {
      res.send(JSON.stringify(friendship));
    };
});

app.get("/api/userbyuId/:uId", function(req, res) {
  mongoose.model("User").find({ uId: req.params.uId }, function(err, User) {
    if (err) console.log(err);
    res.send(JSON.stringify(User));
  });
});

app.get("/api/user/:uId", function(req, res) {
  mongoose.model("User").find({ user_id: req.params.uId }, function(err, User) {
    if (err) console.log(err);
    if (JSON.stringify(User)) {
    }
    res.send(JSON.stringify(User));
  });
});
app.get("/api/user/:roomId", function(req, res) {
  rooms.find({ _id: req.params.roomId }, function(err, rooms) {
    if (err) {
      console.log(err);
    } else {
      res.send(rooms);
    }
  });
});

app.get("/api/user/:user_id", function(req, res) {
  mongoose
    .model("User")
    .find({ user_id: req.params.user_id }, function(err, User) {
      if (err) console.log(err);
      res.send(JSON.stringify(User));
    });
});
app.get("/api/rooms/:roomId", function(req, res) {
  rooms.find({ _id: req.params.roomId }, function(err, room) {
    if (err) {
      console.log(err);
    } else {
      res.send(room);
    }
  });
});

app.get("/api/user", function(req, res) {
  mongoose.model("User").find(function(err, User) {
    res.send(JSON.stringify(User));
  });
});

app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "public", "index.html"));
});

io.on("connection", function(socket) {
  connections.push(socket);
  socket.on("chat message", function(data) {
    var d = new Date(); // for now
    d.getHours();
    d.getMinutes();
    d.getSeconds();
    time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
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
  });

  socket.on("send message", function(data) {
    var d = new Date(); // for now
    d.getHours();
    d.getMinutes();
    d.getSeconds();
    time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
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
        if (err) console.log(err);
        else {
        }
      }
    );

    var msg = {
      from: socket.username,
      message: data.msg,
      favourite: false,
      date: date,
      time: time,
      picture: data.picture
    };
    socket.broadcast.emit("chat messagey", msg);
  });

  socket.on("Join room", function(data) {
    room = data;
  });

  socket.on("recieving msgs", function(data) {
    rooms.find({ _id: data }, function(err, docs) {
      socket.emit("remaining msgs", docs);
      socket.broadcast.to(socket.id).emit("Message for my own", docs);
    });
  });
  socket.on("notesadding", function(data) {
    rooms.find({ _id: data.roomId }, function(err, docs) {
      socket.broadcast.to(socket.id).emit("Note for my own", docs);
    });
  });

  socket.on("pushingMsg", function(data) {
    socket.join("room", function() {
      var name = room;
      io.sockets.in(socket.rooms.room).emit("roomMsg", data);
    });
  });

  socket.on("add User to Group", function(data) {
    var d = new Date(); // for now
    d.getHours();
    d.getMinutes();
    d.getSeconds();
    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
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
        if (err) console.log(err);
        else {
          rooms.find({ _id: data.roomId }, function(err, docs) {
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
              if (err) console.log(err);
              else {
                rooms.find({ _id: data.roomId }, function(err, docs) {
                  socket.emit("returning message group", docs);
                });
              }
              let val = 0;
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
                  if (err) console.log(err);
                  else {
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
              if (err) console.log(err);
              else {
              }
            }
          );
        }
      }
    );
  });
  socket.on("remove User from Group", function(data) {
    var d = new Date(); // for now
    d.getHours();
    d.getMinutes();
    d.getSeconds();
    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
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
        if (err) console.log(err);
        else {
          rooms.find({ _id: data.roomId }, function(err, docs) {
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
              if (err) console.log(err);
              else {
                rooms.find({ _id: data.roomId }, function(err, docs) {
                  socket.emit("returning message group", docs);
                });

                User.findOneAndUpdate(
                  {
                    user_id: data.user_id
                  },
                  { $pull: { rooms: { roomId: data.roomId } } }
                )
                  .then(docs => {})
                  .catch(err => {
                    console.log(err.stack);
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
      var name = room;
      io.sockets.in(socket.rooms.room).emit("roomNotes", data);
    });
  });
  socket.on("addnote", function(data) {
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
        if (err) console.log(err);
        else {
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
        rooms.find({ _id: data.roomId }, function(err, docs) {
          socket.broadcast.emit("Savenotes", docs);
        });
      })
      .catch(err => {
        console.log(rrr.stack);
      });
  });

  socket.on("favourite msg", function(data) {
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
        rooms.find({ _id: data.roomId }, function(err, docs) {
          socket.emit("remainingmsgs", docs);
        });
      })
      .catch(err => {
        console.log(err.stack);
      });
  });
  socket.on("read sync", function(data) {
    User.find({
      user_id: data
    })
      .then(docs => {
        socket.emit("sync success", docs);
      })
      .catch(err => {
        console.log(err.stack);
      });
  });

  socket.on("readcount send", function(data) {
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
          .then(docs => {})
          .catch(err => {
            console.log(err.stack);
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
          .then(docs => {})
          .catch(err => {
            console.log(err.stack);
          });
      }
    }
  });
  socket.on("readcount delete", function(data) {
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
          .then(docs => {})
          .catch(err => {
            console.log(err.stack);
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
          .then(docs => {})
          .catch(err => {
            console.log(err.stack);
          });
      }
    }
  });

  socket.on("readnotes send", function(data) {
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
          .then(docs => {})
          .catch(err => {
            console.log(err.stack);
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
          .then(docs => {})
          .catch(err => {
            console.log(err.stack);
          });
      }
    }
  });
  socket.on("readnotes edit", function(data) {
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
          .then(docs => {})
          .catch(err => {
            console.log(err.stack);
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
          .then(docs => {})
          .catch(err => {
            console.log(err.stack);
          });
      }
    }
  });
  socket.on("readnotes delete", function(data) {
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
          .then(docs => {})
          .catch(err => {
            console.log(err.stack);
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
          .then(docs => {})
          .catch(err => {
            console.log(err.stack);
          });
      }
    }
  });

  socket.on("room leave", function(data) {
    User.findOneAndUpdate(
      {
        user_id: data.user_id
      },
      { $pull: { rooms: { _id: data.roomId } } }
    )
      .then(docs => {
        User.find({ user_id: data.user_id }, function(err, docs) {
          socket.emit("remaininggroups", docs);
        });
      })
      .catch(err => {
        console.log(err.stack);
      });
  });

  socket.on("newdata", function(data) {
    User.find({
      user_id: data
    }).then(docs => {
      socket.emit("remainingchatlist", docs);
    });
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
                if (err) console.log(err);
                else {
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
      socket.emit("refresh group list", docs);
    });
  });
  socket.on("msg delete", function(data) {
    rooms
      .findOneAndUpdate(
        {
          _id: data.roomId
        },
        { $pull: { conversation: { _id: data._id } } }
      )
      .then(docs => {
        rooms.find({ _id: data.roomId }, function(err, docs) {
          socket.emit("remainingmsgs", docs);
        });
      })
      .catch(err => {
        console.log(err.stack);
      });
  });

  socket.on("note delete", function(data) {
    rooms
      .findOneAndUpdate(
        {
          _id: data.roomId
        },
        { $pull: { notes: { _id: data._id } } }
      )
      .then(docs => {
        rooms.find({ _id: data.roomId }, function(err, docs) {
          socket.emit("remainingnotes", docs);
        });
      })
      .catch(err => {
        console.log(err.stack);
      });

    rooms.find({ _id: data.roomId }, function(err, docs) {
      socket.emit("remainingnotes", docs);
    });
  });

  socket.on("add user", function(data) {
    socket.username = data.userrealname;
    socket.picture = data.obj.picture;
    users.push({ id: socket.id, username: data, pic: data.picture });
  });

  socket.on("unfriend user", function(data) {
    Friendships.findOneAndRemove(
      {
        $or: [
          { user_id: data.other_id, other_id: data.user_id, status: "friend" },
          { user_id: data.user_id, other_id: data.other_id, status: "friend" }
        ]
      },
      function(err, rooms) {
        if (err) {
          console.log(err);
        } else {
          Friendships.find(
            {
              $or: [
                { status: "friend", other_id: data.user_id },
                { status: "friend", user_id: data.user_id }
              ]
            },
            function(err, friendship) {
              socket.emit("return remain users", friendship);
            }
          );
          User.find({}, function(err, users) {});
        }
      }
    );
  });
  socket.on("unfriend friendlist", function(data) {
    Friendships.findOneAndRemove(
      {
        $or: [
          { user_id: data.user_id, other_id: data.other_id, status: "friend" },
          { user_id: data.other_id, other_id: data.user_id, status: "friend" }
        ]
      },
      function(err, rooms) {
        if (err) {
          console.log(err);
        } else {
        }
      }
    );
  });
  socket.on("Show Favourites", function(data) {
    rooms.find({ _id: data }, function(err, rooms) {
      if (err) {
        console.log(err);
      } else {
        socket.emit("returned favs", { msg: rooms[0].conversation });
      }
    });
  });
  socket.on("gettingnotes", function(data) {
    rooms.find({ _id: data }, function(err, rooms) {
      if (err) {
        console.log(err);
      } else {
        socket.emit("catching notes", rooms[0].notes);
      }
    });
  });

  socket.on("readcountmsg", function(data) {
    User.findOneAndUpdate(
      {
        user_id: data.user_id,
        "rooms._id": data._id
      },
      {
        $set: {
          "rooms.$.read_count": data.count,
          "rooms.$.read_notes_count": data.count
        }
      }
    )
      .then(docs => {})
      .catch(err => {
        console.log(err.stack);
      });
  });

  socket.on("note map", function(data) {
    rooms.find({ _id: data }, function(err, rooms) {
      if (err) {
        console.log(err);
      } else {
        socket.emit("recieving listchat rooms", rooms);
        socket.emit("msgs", { msg: rooms[0].conversation });
        socket.emit("dbnotes", { dbnotes: rooms[0].notes });
      }
    });
  });

  socket.on("HandleOpen", function(data) {
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
            socket.emit("timetable", docs);
          });
        })
        .catch(err => {
          console.log(err.stack);
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
              socket.emit("timetable", docs);
            });
          });
        })
        .catch(err => {
          console.log(err.stack);
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
            socket.emit("timetable", docs);
          });
        })
        .catch(err => {
          console.log(err.stack);
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
            socket.emit("timetable", docs);
          });
        })
        .catch(err => {
          console.log(err.stack);
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
            socket.emit("timetable", docs);
          });
        })
        .catch(err => {
          console.log(err.stack);
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
          User.find({
            user_id: data.user_id
          }).then(docs => {
            socket.emit("timetable", docs);
          });
        })
        .catch(err => {
          console.log(err.stack);
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
          User.find({
            user_id: data.user_id
          }).then(docs => {
            socket.emit("timetable", docs);
          });
        })
        .catch(err => {
          console.log(err.stack);
        });
    }
  });

  socket.on("createpnotes", function(data) {
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
        if (err) console.log(err);
        else {
        }
      }
    );
  });
  socket.on("gettingpnotes", function(data) {
    User.find({ _id: data }, function(err, notes) {
      if (err) {
        console.log(err);
      } else {
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
        if (err) console.log(err);
        else {
          User.find({ _id: data.id }, function(err, _user) {
            if (err) {
              console.log(err);
            } else {
              socket.emit("refreshprinotes", _user);
            }
          });
        }
      }
    );
  });

  socket.on("retrieve msgs", function(data) {
    rooms.find({ _id: data.roomId }, function(err, rooms) {
      if (err) {
      } else {
        socket.emit("chat msgs", rooms);
      }
    });
  });

  socket.on("deleteFolder", function(data) {
    User.findOneAndUpdate(
      {
        _id: data.id
      },
      { $pull: { privatenotes: { _id: data.folderid } } }
    )
      .then(docs => {
        User.find({ _id: data.id }, function(err, docs) {
          socket.emit("remainingpnotes", docs);
        });
      })
      .catch(err => {
        console.log(err.stack);
      });
  });
  socket.on("editingInsideNote", function(data) {
    User.findOne({ _id: data.id }, function(err, doc) {
      if (err) console.log(err);
      else {
        for (var i = 0; i < doc.privatenotes.length; i++) {
          if (doc.privatenotes[i]._id == data.folderId) {
            for (var j = 0; j < doc.privatenotes[i].notes.length; j++) {
              if (doc.privatenotes[i].notes[j]._id == data.noteId) {
                doc.privatenotes[i].notes[j].title = data.note;
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
              User.find(
                { _id: data.id, "privatenotes._id": data.folderId },
                function(err, docs) {
                  if (err) {
                    console.log(err);
                  } else {
                    socket.emit("editedPnotes", docs);
                  }
                }
              );
            }
          }
        );
      }
    });
  });
  socket.on("deletepnote", function(data) {
    User.findOne({ _id: data.id }, function(err, doc) {
      if (err) console.log(err);
      else {
        for (var i = 0; i < doc.privatenotes.length; i++) {
          if (doc.privatenotes[i]._id == data.folder) {
            for (var j = 0; j < doc.privatenotes[i].notes.length; j++) {
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
                  socket.emit("editedDnotes", docs);
                }
              });
            }
          }
        );
      }
    });
  });

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
        if (err) console.log(err);
        else {
          rooms.findOneAndUpdate(
            { _id: data.roomId },
            { $pull: { remainparticipants: { user_id: data.user_id } } },
            function(err, docs) {
              if (err) console.log(err);
              else {
              }
            }
          );
        }
      }
    );
  });

  function updateUsernames() {
    io.sockets.emit("get users", users);
  }
});
