// Switch between mongodb and mysql by changing AccidentModel path
const AccidentModel = require("../models/mongo/AccidentModel.js"); 
const Accident = new AccidentModel();

class AccidentController {
  constructor() {
    console.log("Initializing AccidentController");
  }

  async findAccidentData(req, res) {
    const searchYear = req.query?.searchYear || '';
    const expresswayName = req.query?.expresswayName || '';
    const accidents = await Accident.findAll(expresswayName, searchYear)
      .catch((e) => {
        console.error(e);
        return [];
      });

    res.send(accidents);
  }

  async insertManyAccidents(req, res) {
    const accidents = req.body.accidents;

    try {
      const result = await Accident.insertMany(accidents)
      .catch((e) => {
        console.error(e);
      });
      res.status(201).send(result);
    }catch(e){
      res.status(400).send({message: "Bad Request"});
    }
  }
  
  async findAllDeath(req, res) {
    const searchYear = req.query?.searchYear || '';
    const expresswayName = req.query?.expresswayName || '';

    try {
      const result = await Accident.findAllDeath(expresswayName, searchYear)
      .catch((e) => {
        console.error(e);
      });
      res.status(200).send(result);
    }catch(e){
      res.status(400).send({message: "Bad Request"});
    }
  }

  async findDeadStat(req, res) {
    const searchYear = req.query?.searchYear || '';
    const expresswayName = req.query?.expresswayName || '';

    try {
      const result = await Accident.findDeadStat(expresswayName, searchYear)
      .catch((e) => {
        console.error(e);
      });
      res.status(200).send(result);
    }catch(e){
      res.status(400).send({message: "Bad Request"});
    }
  }
  async findAllInjure(req, res) {
    const searchYear = req.query?.searchYear || '';
    const expresswayName = req.query?.expresswayName || '';

    try {
      const result = await Accident.findAllInjure(expresswayName, searchYear)
      .catch((e) => {
        console.error(e);
      });
      res.status(200).send(result);
    }catch(e){
      res.status(400).send({message: "Bad Request"});
    }
  }

  async findInjureStat(req, res) {
    const searchYear = req.query?.searchYear || '';
    const expresswayName = req.query?.expresswayName || '';

    try {
      const result = await Accident.findInjureStat(expresswayName, searchYear)
      .catch((e) => {
        console.error(e);
      });
      res.status(200).send(result);
    }catch(e){
      res.status(400).send({message: "Bad Request"});
    }
  }
  async findAllWeather(req, res) {
    const searchYear = req.query?.searchYear || '';
    const expresswayName = req.query?.expresswayName || '';

    try {
      const result = await Accident.findAllWeather(expresswayName, searchYear)
      .catch((e) => {
        console.error(e);
      });
      res.status(200).send(result);
    }catch(e){
      res.status(400).send({message: "Bad Request"});
    }
  }
  
  async findWeatherStat(req, res) {
    const searchYear = req.query?.searchYear || '';
    const expresswayName = req.query?.expresswayName || '';
    
    try {
      const result = await Accident.findWeatherStat(expresswayName, searchYear)
      .catch((e) => {
        console.error(e);
      });
      res.status(200).send(result);
    }catch(e){
      res.status(400).send({message: "Bad Request"});
    }
  }

  async findYearAvailable(req, res) {
    const searchYear = req.query?.searchYear || '';
    const expresswayName = req.query?.expresswayName || '';
  
    try {
      const result = await Accident.findYearAvailable(expresswayName, searchYear)
      .catch((e) => {
        console.error(e);
      });
      res.status(200).send(result);
    }catch(e){
      res.status(400).send({message: "Bad Request"});
    }
  }

  async findRoadAvailable(req, res) {
    const searchYear = req.query?.searchYear || '';
    const expresswayName = req.query?.expresswayName || '';
  
    try {
      const result = await Accident.findRoadAvailable(expresswayName, searchYear)
      .catch((e) => {
        console.error(e);
      });
      res.status(200).send(result);
    }catch(e){
      res.status(400).send({message: "Bad Request"});
    }
  }
  async findAccidentOnRoad(req, res) {
    const searchYear = req.query?.searchYear || '';  
    try {
      const result = await Accident.findAccidentOnRoad(searchYear)
      .catch((e) => {
        console.error(e);
      });
      res.status(200).send(result);
    }catch(e){
      res.status(400).send({message: "Bad Request"});
    }
  }

  async findAccidentFreqency(req, res) {
    const searchYear = req.query?.searchYear || '';
    const expresswayName = req.query?.expresswayName || '';
  
    try {
      const result = await Accident.findAccidentFreqency(expresswayName, searchYear)
      .catch((e) => {
        console.error(e);
      });
      res.status(200).send(result);
    }catch(e){
      res.status(400).send({message: "Bad Request"});
    }
  }
   
}

module.exports = AccidentController;
