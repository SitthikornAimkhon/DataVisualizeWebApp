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
      accident_time: 1,
      expw_step: 1,
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

  async findAllInjure(
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
      accident_time: 1,
      expw_step: 1,
      injur_femel: 1,
      injur_man: 1,
    };

    const injureResult = await this.Accident.find(query, selectedFields);

    // If there is no accident
    if (injureResult.length == 0) {
      return [];
    }

    return injureResult;
  }

  async findInjureStat(
    expresswayName = null,
    searchYear = new Date().getFullYear()
  ) {
    const injureResult = await this.findAllInjure(expresswayName, searchYear);

    let initInjureStat = {
      total_injure: 0,
      total_man: 0,
      total_female: 0,
    };

    const injureStat = injureResult.reduce((obj, d) => {
      let tmpObj = { ...obj };
      tmpObj.total_man += d.injur_man;
      tmpObj.total_female += d.injur_femel;
      tmpObj.total_injure = tmpObj.total_female + tmpObj.total_man;

      return tmpObj;
    }, initInjureStat);

    return injureStat;
  }

  async findAllWeather(
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
      accident_time: 1,
      expw_step: 1,
      weather_state: 1,
    };

    const weatherResult = await this.Accident.find(query, selectedFields);

    // If there is no accident
    if (weatherResult.length == 0) {
      return [];
    }

    return weatherResult;
  }

  async findWeatherStat(
    expresswayName = null,
    searchYear = new Date().getFullYear()
  ) {
    const weatherResult = await this.findAllWeather(expresswayName, searchYear);

    let initweatherStat = {
      total_normal: 0,
      total_abnormal: 0,
      rain: 0,
      heavy_rain: 0,
      slippy_road: 0,
    };

    const weatherStat = weatherResult.reduce((obj, d) => {
      let tmpObj = { ...obj };
      console.log(d.weather_state);
      switch (d.weather_state) {
        case "ฝนตก":
          tmpObj.rain += 1;
          break;
        case "ฝนตกลมแรง":
          tmpObj.heavy_rain += 1;
          break;
        case "ถนนเปียกลื่น":
          tmpObj.slippy_road += 1;
          break;
        default:
          tmpObj.total_normal += 1;
          break;
      }

      tmpObj.total_abnormal =
        tmpObj.rain + tmpObj.heavy_rain + tmpObj.slippy_road;

      return tmpObj;
    }, initweatherStat);

    return weatherStat;
  }
}

module.exports = AccidentModel;
