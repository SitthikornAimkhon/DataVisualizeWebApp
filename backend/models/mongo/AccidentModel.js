const mongoose = require("mongoose");
require('dotenv').config({path:"../.env"});
const { DB_URL } = process.env;

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
    
    Accident;

    constructor() {
        this.connect();
    }

    connect() {

        mongoose
        .connect(DB_URL)
        .then(() => console.log("Database Connected"))
        .catch((err) => console.log(err));

        mongoose.Promise = global.Promise;

        this.Accident = mongoose.model('Accident', accidentSchema);

    }

    async findAll() {
        return await this.Accident.find({});
    }

    async findAllbetweenDate(startDate, endDate) {
        // Example findAllbetweenDate("2023-01-20", "2023-01-31")
        return await this.Accident.find({accident_date:{$gte: startDate,$lte: endDate}});
    }
}

module.exports = AccidentModel;
