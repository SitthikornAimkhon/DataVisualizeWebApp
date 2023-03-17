const express = require('express');
const router = express.Router();
const AccidentController = require('../controllers/AccidentController');

const accidentController = new AccidentController();

router.get('/', accidentController.getAccidentData);
router.get('/death', accidentController.findAllDeath);
router.get('/death/stat', accidentController.getDeadStat);
router.post('/', accidentController.insertManyAccidents);

module.exports = router;