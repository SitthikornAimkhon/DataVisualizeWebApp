// Switch between mongodb and mysql by changing AccidentModel path
const AccidentModel = require("../models/mongo/AccidentModel"); 
const Accident = new AccidentModel();

class AccidentController {
  constructor() {
    console.log("Initializing AccidentController");
  }

  async getAccidentData(req, res) {
    const accidents = await Accident.findAll()
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
}

module.exports = AccidentController;
