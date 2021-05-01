const express = require("express");
const app = express();
const PORT = 4000;
const MongoConnection = require("./db/mongoose.db");
const userrouter = require("./routes/user.route");
MongoConnection();

app.use(userrouter);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to Team Maniacs Server" });
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Server started at port", process.env.PORT || PORT);
});
