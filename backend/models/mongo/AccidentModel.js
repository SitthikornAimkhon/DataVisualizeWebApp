require('dotenv').config();

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
        process.on('SIGINT', () => {
            mongoose.disconnect()
            console.log('\nMongo connection was closed');
        });
    }

    connect() {

        mongoose
        .connect(MONGODB_URL)
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

    async insertMany(accidents) {
        const result = await this.Accident.insertMany(accidents);
        
        return result;
    }
}

module.exports = AccidentModel;
