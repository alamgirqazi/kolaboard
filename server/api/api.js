var User = require("../models/User.js");
var Friendships = require("../models/Friendships.js");
var Events = require("../models/Events.js");
var rooms = require("../models/groupList.js");
var path = require("path");
const mongoose = require("mongoose");
module.exports = function(app) {
    var users, connections, room;
users = [];
connections = [];
let user_id_server;
var myuserid;
console.log("This is api.js");
    app.get("/", function(req, res) {
    });

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
      response.sendFile(path.resolve(__dirname, "../../public", "index.html"));
    });
}