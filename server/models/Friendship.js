var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var FriendshipSchema = new Schema({
  
  user_id: {
    type: String,
    default: "",
    unique: true,
    // required: "Content is required",
    trim: true
  },
  other_id: {
    type: String,
    default: "",
    // trim: true emailverified
  },

  status: {
    type: String,
    default: "none",
    // required: "Friendship is Must"
  },

});
FriendshipSchema.plugin(uniqueValidator);

module.exports =  mongoose.model('Friendship', FriendshipSchema)

