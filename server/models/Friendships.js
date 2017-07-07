var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FriendshipsSchema = new Schema({
  user_id: {
    type: String,
    default: "",
    trim: true
  },
  other_id: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    index: true
  },
  picture: {
    type: String
  },
  user_picture: {
    type: String
  },
  other_id_name: {
    type: String
  },
  user_id_name: {
    type: String
  }
});

FriendshipsSchema.index({ user_id: 1, other_id: 1 }, { unique: true });

module.exports = mongoose.model("Friendships", FriendshipsSchema);
