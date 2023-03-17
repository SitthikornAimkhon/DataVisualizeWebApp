require("dotenv").config();

const { MONGODB_URL } = process.env;
const mongoose = require("mongoose");

const accidentSchema = new mongoose.Schema({
  accident_date: Date,
  accident_time: String,
  expw_step: String,
  weather_state: String,
  injur_man: Number,
  injur_femel: Number,
  dead_man: Number,
  dead_femel: Number,
  cause: String,
});

class AccidentModel {
  static Accident;

  constructor() {
    this.connect();

    // Disconnect when app closed
    process.on("SIGINT", () => {
      mongoose.disconnect();
      console.log("\nMongo connection was closed");
    });
  }

  connect() {
    mongoose
      .connect(MONGODB_URL)
      .then(() => console.log("Database Connected"))
      .catch((err) => console.log(err));

    mongoose.Promise = global.Promise;

    this.Accident = mongoose.model("Accident", accidentSchema);
  }

  async findAll() {
    return await this.Accident.find({});
  }

  async findAllbetweenDate(startDate, endDate) {
    // Example findAllbetweenDate("2023-01-20", "2023-01-31")
    return await this.Accident.find({
      accident_date: { $gte: startDate, $lte: endDate },
    });
  }

  async insertMany(accidents) {
    const result = await this.Accident.insertMany(accidents);

    return result;
  }

  async findAllDeath(
    expresswayName = null,
    searchYear = new Date().getFullYear()
  ) {
    const query = {
      $expr: {
        $and: [
          {
            $eq: [
              {
                $year: "$accident_date",
              },
              searchYear,
            ],
          },
          expresswayName
            ? {
                $eq: ["$expw_step", expresswayName],
              }
            : {},
        ],
      },
    };

    const selectedFields = {
      _id: 1,
      accident_date: 1,
      dead_man: 1,
      dead_femel: 1,
    };

    const deadResult = await this.Accident.find(query, selectedFields);

    // If there is no accident
    if (deadResult.length == 0) {
      return [];
    }

    return deadResult;
  }

  async findDeadStat(
    expresswayName = null,
    searchYear = new Date().getFullYear()
  ) {
    const deadResult = await this.findAllDeath(expresswayName, searchYear);

    let initDeadStat = {
      total_dead: 0,
      total_man: 0,
      total_female: 0,
    };

    const deadStat = deadResult.reduce((obj, d) => {
      let tmpObj = { ...obj };
      tmpObj.total_man += d.dead_man;
      tmpObj.total_female += d.dead_femel;
      tmpObj.total_dead = tmpObj.total_female + tmpObj.total_man;

      return tmpObj;
    }, initDeadStat);

    return deadStat;
  }
}

module.exports = AccidentModel;
