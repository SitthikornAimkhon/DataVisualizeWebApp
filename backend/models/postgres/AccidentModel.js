require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");

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
      console.log("\nMongo connection was closed");
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
    expresswayName = null,
    searchYear = new Date().getFullYear()
  ) {}

  async findDeadStat(
    expresswayName = null,
    searchYear = new Date().getFullYear()
  ) {}

  async findAllInjure(
    expresswayName = null,
    searchYear = new Date().getFullYear()
  ) {}

  async findInjureStat(
    expresswayName = null,
    searchYear = new Date().getFullYear()
  ) {}

  async findAllWeather(
    expresswayName = null,
    searchYear = new Date().getFullYear()
  ) {}

  async findWeatherStat(
    expresswayName = null,
    searchYear = new Date().getFullYear()
  ) {}

  async findAllCause(
    expresswayName = null,
    searchYear = new Date().getFullYear()
  ) {}
}

module.exports = AccidentModel;
