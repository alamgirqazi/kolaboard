var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  title: {
    type: String,
    default: ""
  },
  user_name: {
    type: String,
    default: ""
  },
  description: {
    type: String
  },
  pictures: [],
  date: {
    type: String
  }
});

// EventSchema.index({ user_id: 1, other_id: 1 }, { unique: true });

module.exports = mongoose.model("Events", EventSchema);
