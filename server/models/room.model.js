const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user.model");
const roomSchema = new Schema({
  roomName: String,
  users: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: User } }],
});
const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
