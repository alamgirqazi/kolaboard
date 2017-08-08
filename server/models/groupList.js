var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var roomsSchema = new Schema({
  groupname: {
    type: String,
    default: "",
    trim: true
  },
  avatarletter: {
    type: String,
    default: "",
    trim: true
  },
  admin_id: {
    type: String,
    default: ""
  },

  conversation: [
    {
      from: String,
      message: String,
      favourite: Boolean,
      date: String,
      time: String,
      picture: String
    }
  ],
  notes: [
    {
      from: String,
      text: String,
      date: String,
      time: String
    }
  ],
  participants: [{}],
  remainparticipants: [{}]
});

// groupListSchema.index({ "user_id": 1, "other_id": 1 }, { "unique": true });

module.exports = mongoose.model("rooms", roomsSchema);
