const mongoose = require("mongoose");

const MongoConnection = () => {
  (async () => {
    try {
      const connection = await mongoose.connect(
        "mongodb+srv://maniacs:neogHack2021@neoghack.xgtjr.mongodb.net/hackathon2021?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      console.log("Successfully Connected to the Database");
    } catch (error) {
      console.log(
        "Error in connecting with database. Error Message: ",
        error.message
      );
    }
  })();
};

module.exports = MongoConnection;
