var mongoose = require("mongoose");

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
  picture: {
    type: String,
    default: "",
    // required: "Content is required",
    trim: true
  },
  verified: {
    type: Boolean,
    default: "",
    trim: true
  },
  user_id: {
    type: String,
    default: "",
    // required: "Content is required",
    trim: true
  },
  creator: {
    type: Schema.ObjectId,
    ref: "User",
    // required: "User is Must"
  }
});

mongoose.model("User", UserSchema);
