const express = require('express');
const router = express.Router();
const AccidentController = require('../controllers/AccidentController');

const accidentController = new AccidentController();

router.get('/', accidentController.findAccidentData);
router.get('/deads', accidentController.findAllDeath);
router.get('/deads/stat', accidentController.findDeadStat);
router.post('/', accidentController.insertManyAccidents);
router.get('/injures', accidentController.findAllInjure);
router.get('/injures/stat', accidentController.findInjureStat);
router.get('/weathers', accidentController.findAllWeather);
router.get('/weathers/stat', accidentController.findWeatherStat);
router.get('/years', accidentController.findYearAvailable);



module.exports = router;