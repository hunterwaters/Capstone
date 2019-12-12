require("dotenv").config();

const mongoose = require("mongoose");

class Connect {
  static async connToDB() {
    if (mongoose.connection.readyState === 0) {
      await mongoose
        .connect(
          process.env.NODE_ENV === "test"
            ? process.env.DB_TEST_URL
            : process.env.DB_URL,
          {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
          }
        )
        .catch(err => console.error(err));
    }
    const db = mongoose.connection;
    db.on("error", error => console.error(error));
    db.once("open", () => console.log("connected to database"));
  }

  static truncate() {
    if (mongoose.connection.readyState !== 0) {
      const { collections } = mongoose.connection;

      const promises = Object.keys(collections).map(collection => {
        mongoose.connection.collection(collection).deleteMany({});
      });

      Promise.all(promises).catch(err => {
        return err;
      });
    }
  }
}

module.exports = Connect;
