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

  async findAll(expresswayName = "", searchYear = "") {
    let query;

    if (searchYear === "" && expresswayName === "") {
      query = {};
    } else {
      query = {
        $expr: {
          $and: [
            searchYear ? { $eq: [{ $year: "$accident_date" }, +searchYear] } : {},
            expresswayName ? { $eq: ["$expw_step", expresswayName] } : {},
          ],
        },
      };
    }
    const accidentResult = await this.Accident.find(query);
    return accidentResult;
  }

  async findAllDeath(expresswayName = "", searchYear = "") {
    let query;

    if (searchYear === "" && expresswayName === "") {
      query = {};
    } else {
      query = {
        $expr: {
          $and: [
            searchYear ? { $eq: [{ $year: "$accident_date" }, +searchYear] } : {},
            expresswayName ? { $eq: ["$expw_step", expresswayName] } : {},
          ],
        },
      };
    }

    const selectedFields = {
      _id: 1,
      accident_date: 1,
      accident_time: 1,
      expw_step: 1,
      dead_man: 1,
      dead_femel: 1,
    };

    const deadResult = await this.Accident.find(query, selectedFields);
    console.log(searchYear);
    console.log(JSON.stringify(query, null, 2));
    // If there is no accident
    if (deadResult.length == 0) {
      return [];
    }

    return deadResult;
  }

  async findDeadStat(expresswayName = "", searchYear = "") {
    const deadResult = await this.findAllDeath(expresswayName, searchYear);

    let initDeadStat = {
      total_dead: 0,
      total_man: 0,
      total_female: 0,
    };

    const deadStat = deadResult.reduce((obj, d) => {
      let tmpObj = { ...obj };
      tmpObj.total_man += d.dead_man || 0;
      tmpObj.total_female += d.dead_femel || 0;
      tmpObj.total_dead = tmpObj.total_female + tmpObj.total_man;

      return tmpObj;
    }, initDeadStat);

    return deadStat;
  }

  async findAllInjure(expresswayName = "", searchYear = "") {
    let query;

    if (searchYear === "" && expresswayName === "") {
      query = {};
    } else {
      query = {
        $expr: {
          $and: [
            searchYear ? { $eq: [{ $year: "$accident_date" }, +searchYear] } : {},
            expresswayName ? { $eq: ["$expw_step", expresswayName] } : {},
          ],
        },
      };
    }

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

  async findInjureStat(expresswayName = "", searchYear = "") {
    const injureResult = await this.findAllInjure(expresswayName, searchYear);

    let initInjureStat = {
      total_injure: 0,
      total_man: 0,
      total_female: 0,
    };

    const injureStat = injureResult.reduce((obj, d) => {
      let tmpObj = { ...obj };
      tmpObj.total_man += d.injur_man || 0;
      tmpObj.total_female += d.injur_femel || 0;
      tmpObj.total_injure = tmpObj.total_female + tmpObj.total_man;

      return tmpObj;
    }, initInjureStat);

    return injureStat;
  }

  async findAllWeather(expresswayName = "", searchYear = "") {
    let query;

    if (searchYear === "" && expresswayName === "") {
      query = {};
    } else {
      query = {
        $expr: {
          $and: [
            searchYear ? { $eq: [{ $year: "$accident_date" }, +searchYear] } : {},
            expresswayName ? { $eq: ["$expw_step", expresswayName] } : {},
          ],
        },
      };
    }

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

  async findWeatherStat(expresswayName = "", searchYear = "") {
    const weatherResult = await this.findAllWeather(expresswayName, searchYear);
    let initweatherStat = {
      total: 0,
      normal: 0,
      abnormal: 0,
    };

    const weatherStat = weatherResult.reduce((obj, d) => {
      let tmpObj = { ...obj };

      if (d.weather_state === "ปกติ") {
        tmpObj.normal += 1;
      } else {
        tmpObj.abnormal += 1;
      }

      return tmpObj;
    }, initweatherStat);

    weatherStat.total = weatherStat.normal + weatherStat.abnormal;

    return weatherStat;
  }

  async findYearAvailable() {
    const query = [
      {
        $group: {
          _id: null,
          years: {
            $addToSet: {
              $dateToString: { date: "$accident_date", format: "%Y" },
            },
          },
        },
      },
    ];

    const yearAvailable = await this.Accident.aggregate(query);

    return yearAvailable.pop().years;
  }

  async findRoadAvailable() {
    const query = "expw_step";

    const roadAvailable = await this.Accident.distinct(query);

    return roadAvailable;
  }

  async findAccidentOnRoad(searchYear = "") {
    const query = [
      {
        $match: {
          $expr:
            (searchYear != null && searchYear != "")
              ? {
                  $eq: [{ $year: "$accident_date" }, +searchYear],
                }
              : {},
        },
      },
      {
        $group: {
          _id: "$expw_step",
          count: { $sum: 1 },
        },
      },
    ];
    const res = await this.Accident.aggregate(query);

    const result = res.reduce((arr, obj) => {
      const data = {
        name: obj._id,
        count: obj.count,
      };

      arr.push(data);
      return arr;
    }, []);

    return result;
  }

  async findAccidentFreqency(expresswayName = "", searchYear = "") {
    const query = [
      {
        $match: {
          $expr: {
            $and: [
              (searchYear !== "")
                ? { $eq: [{ $year: "$accident_date" }, +searchYear] }
                : {},
              (expresswayName !== "")
                ? { $eq: ["$expw_step", expresswayName] }
                : {},
            ],
          },
        },
      },
      {
        $project: {
          hour: { $substr: ["$accident_time", 0, 2] },
        },
      },
      {
        $group: {
          _id: "$hour",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];
    console.error(JSON.stringify(query, null, 2)
    );
    const accidentFreqency = await this.Accident.aggregate(query);
    // If there is no accident
    if (accidentFreqency.length == 0) {
      return [];
    }

    const formated = accidentFreqency.map((d) => {
      return {
        time: `${d._id}:00`,
        count: d.count,
      };
    });

    return formated;
  }
}

module.exports = AccidentModel;
