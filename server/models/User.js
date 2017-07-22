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
    // required: "Title Cannot Be Blank",
    trim: true
  },
  email: {
    type: String,
    default: "",
    // required: "Content is required",
    trim: true
  },
  nickname: {
    type: String,
    default: "",
    // required: "Content is required",
    trim: true
  },
  desc: {
    type: String,
    default: "",
    // required: "Content is required",
    trim: true
  },
  picture: {
    type: String,
    default: "",
    // required: "Content is required",
    trim: true
  },
  email_verified: {
    type: Boolean,
    default: ""
    // trim: true emailverified
  },
  created_at: {
    type: String,
    default: ""
    // trim: true emailverified
  },
  user_id: {
    type: String,
    default: "",
    unique: true,
    // required: "Content is required",
    trim: true
  },
  creator: {
    type: Schema.ObjectId,
    ref: "User"
    // required: "User is Must"
  },
  obj: {
    type: Object
    // required: "User is Must"
  },
  uId: {
    type: String
    // required: "User is Must"
  },
  emailnotif: {
    type: Boolean
    // required: "User is Must"
  },
  rooms: [
    {
      roomId: "string",
      roomName: "String",
      pic: "string",
      read_count: "string",
      total_count: "string"
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
  timetable: [
    {
      day: [
        {
          time: "string"
        }
      ]
    }
  ],
  identities: {
    type: Object
    // required: "User is Must"
  }
});
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
