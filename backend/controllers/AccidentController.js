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
}

module.exports = AccidentController;
