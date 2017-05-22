var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FriendshipsSchema = new Schema({
  
  user_id: {
    type: String,
    default: "",
    trim: true,
  },
  other_id: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    index:true,
  },

});

FriendshipsSchema.index({ "user_id": 1, "other_id": 1 },{ "unique": true });


module.exports =  mongoose.model('Friendships', FriendshipsSchema)

