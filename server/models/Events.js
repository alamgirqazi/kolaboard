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

module.exports = mongoose.model("Events", EventSchema);
