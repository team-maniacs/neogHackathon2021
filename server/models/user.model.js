const mongoose = require("mongoose");
const { Schema } = mongoose;
const Room = require("./room.model");
const userSchema = new Schema({
  username: String,
  rooms: [{ roomId: { type: mongoose.Schema.Types.ObjectId, ref: Room } }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
