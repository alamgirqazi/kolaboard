var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  created: {
    type: Date,
    Default: Date.now()
  },
  name: {
    type: String,
    default: "",
    trim: true
  },
  email: {
    type: String,
    default: "",
    trim: true
  },
  nickname: {
    type: String,
    default: "",
    trim: true
  },
  desc: {
    type: String,
    default: "",
    trim: true
  },
  picture: {
    type: String,
    default: "",
    trim: true
  },
  email_verified: {
    type: Boolean,
    default: ""
  },
  created_at: {
    type: String,
    default: ""
  },
  user_id: {
    type: String,
    default: "",
    unique: true,
    trim: true
  },
  creator: {
    type: Schema.ObjectId,
    ref: "User"
  },
  obj: {
    type: Object
  },
  uId: {
    type: String
  },
  emailnotif: {
    type: Boolean
  },
  rooms: [
    {
      roomId: "string",
      roomName: "String",
      pic: "string",
      read_count: "string",
      total_count: "string",
      read_notes_count: "string",
      total_notes_count: "string"
    }
  ],
  privatenotes: [
    {
      title: "string",
      desc: "string",
      notes: [
        {
          title: "string",
          time: "string"
        }
      ]
    }
  ],
  timetable: {
    day: [
      {
        id: "String",
        time: "String",
        M: "String",
        T: "String",
        W: "String",
        Th: "String",
        F: "String",
        S: "String",
        Su: "String"
      }
    ]
  },
  identities: {
    type: Object
  }
});
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
