var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var FriendshipSchema = new Schema({
  
  user_id: {
    type: String,
    default: "",    // required: "Content is required",
    trim: true,
            index: true

  },
  other_id: {
    type: String,
    default: "",
            index: true

    // trim: true emailverified
  },

  status: {
    type: String,
    default: "none",
    // required: "Friendship is Must"
  },

});
FriendshipSchema.index({ other_id: 1, user_id: 1 }, { unique: true });

FriendshipSchema.plugin(uniqueValidator);

module.exports =  mongoose.model('Friendship', FriendshipSchema)

