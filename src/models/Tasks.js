const mongoose = require("mongoose");

const UserTacks =  new mongoose.Schema({
  description: {
    type: String,
    required: "{PATH} is required"
  },
  state: {
    type: Boolean,
    required: "{PATH} is required"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Tasks", UserTacks);
