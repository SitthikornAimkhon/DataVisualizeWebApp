require("dotenv").config();
const { Sequelize, Model, DataTypes, Op } = require("sequelize");

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
  static Accident = {};

  constructor() {
    this.connect();

    // Disconnect when app closed
    process.on("SIGINT", () => {
      mongoose.disconnect();
      console.log("\nPostgres connection was closed");
    });
  }

  connect() {
    const hostName = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const userName = process.env.DB_USER;
    const password = process.env.DB_PASS;
    const database = process.env.DB_NAME;
    const dialect = process.env.DIALECT;

    const sequelize = new Sequelize(database, userName, password, {
      host: hostName,
      port: port,
      dialect: dialect,
      operatorsAliases: 0,
      pool: {
        max: 10,
        min: 0,
        acquire: 20000,
        idle: 5000,
      },
    });

    const tmpDb = {};
    tmpDb.Sequelize = Sequelize;
    tmpDb.sequelize = sequelize;
    tmpDb.accidents = require("./accident.schema.js")(
      sequelize,
      DataTypes,
      Model
    );

    this.Accident = tmpDb;

    this.Accident.sequelize.sync().then(() => {
      console.log("synced");
    });
  }

  async findAll() {
    try {
      const tasks = this.Accident.accidents.findAll({});
      console.log("accidents:::", tasks);
      return tasks;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async findAllbetweenDate(startDate, endDate) {
    // Example findAllbetweenDate("2023-01-20", "2023-01-31")
  }

  async insertMany(accidents) {}

  async findAllDeath(
    expresswayName = '',
    searchYear = ''
  ) {
    const selectedFields = [
      "_id",
      "accident_date",
      "accident_time",
      "expw_step",
      "dead_man",
      "dead_femel",
    ];
    //console.log(searchYear.length);
    const { Op } = require("sequelize");
    const deadResult = await this.Accident.accidents.findAll({
      attributes: selectedFields,
      where: {
        [Op.and]: [
          searchYear ? this.Accident.sequelize.where(
            this.Accident.sequelize.literal(`EXTRACT(YEAR FROM ${this.Accident.accidents.name}.accident_date)`),
            +searchYear
          ) : {},
          expresswayName ? { expw_step: expresswayName } : {},
        ]
      }
    });
    
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

  async findAllInjure(
    expresswayName = '',
    searchYear = ''
  ) {
    const selectedFields = [
      "_id",
      "accident_date",
      "accident_time",
      "expw_step",
      "injur_man",
      "injur_femel",
    ];
    const { Op } = require("sequelize");
    const deadResult = await this.Accident.accidents.findAll({
      attributes: selectedFields,
      where: {
        [Op.and]: [
          searchYear ? this.Accident.sequelize.where(
            this.Accident.sequelize.literal(`EXTRACT(YEAR FROM ${this.Accident.accidents.name}.accident_date)`),
            +searchYear
          ) : {},
          expresswayName ? { expw_step: expresswayName } : {},
        ]
      }
    });
    
    return deadResult;
  }
  async findInjureStat(
    expresswayName = '',
    searchYear = ''
  ) {
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

  async findAllWeather(
    expresswayName = '',
    searchYear = ''
  ) {
    const selectedFields = [
      "_id",
      "accident_date",
      "accident_time",
      "expw_step",
      "weather_state"
    ];
    const { Op } = require("sequelize");
    const deadResult = await this.Accident.accidents.findAll({
      attributes: selectedFields,
      where: {
        [Op.and]: [
          searchYear ? this.Accident.sequelize.where(
            this.Accident.sequelize.literal(`EXTRACT(YEAR FROM ${this.Accident.accidents.name}.accident_date)`),
            +searchYear
          ) : {},
          expresswayName ? { expw_step: expresswayName } : {},
        ]
      }
    });
    
    return deadResult;
  }

  async findWeatherStat(
    expresswayName = '',
    searchYear = ''
  ) {
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

  async findRoadAvailable() {
    const query = "expw_step";
    const roadAvailable = await this.Accident.accidents.findAll({
      attributes: [[this.Accident.sequelize.fn('DISTINCT', this.Accident.sequelize.col(query)), 'expw_step']]
    });
    return roadAvailable.map((row) => row.expw_step);
  }
  
  async findYearAvailable(){
    const yearAvailable = await this.Accident.accidents.findAll({
      attributes: [
        [this.Accident.sequelize.literal(`EXTRACT(YEAR FROM ${this.Accident.accidents.name}.accident_date)`), 'year']
      ]
    });

    // cast type to integer and extract year value from object
    const years = yearAvailable.map((d) => {
      const obj = d.get({ plain: true});
      return +obj.year;
    });  

    // keep only unique year
    const distinctYears = [...new Set(years)];

    // sort DESC
    distinctYears.sort();
    distinctYears.reverse();

    return distinctYears;
  }

  async findAccidentOnRoad(expresswayName = "", searchYear = ""){
    const res = this.Accident.accidents.findAll({
      attributes: [
          ['expw_step', 'name'],
          [this.Accident.sequelize.fn('count', this.Accident.sequelize.col('*')), 'count']
      ],
      where: {
          [Op.and]: [
              searchYear ? this.Accident.sequelize.fn('extract', 'year', this.Accident.sequelize.col('accident_date')) === searchYear : {}
          ]
      },
      group: ['expw_step'],
      raw: true
    })
   return res;
  }

  async findAccidentFreqency(expresswayName = "", searchYear = "") {
    const accidentFreqency = await this.Accident.accidents.findAll({
      attributes: [
          [
            this.Accident.sequelize.fn(
              'concat',
              this.Accident.sequelize.fn(
                'substring', 
                this.Accident.sequelize.col('accident_time'),
                1,
                2
              ),
              ':00'
            ),
            'time'
          ],
          [this.Accident.sequelize.fn('count', this.Accident.sequelize.col('*')), 'count']
      ],
      where: {
        [Op.and]: [
          searchYear ? this.Accident.sequelize.where(
            this.Accident.sequelize.literal(`EXTRACT(YEAR FROM ${this.Accident.accidents.name}.accident_date)`),
            +searchYear
          ) : {},
          expresswayName ? { expw_step: expresswayName } : {},
        ]
      },
      group: ['time'],
      order: ['time']
    });

    return accidentFreqency;
  }
}

module.exports = AccidentModel;
