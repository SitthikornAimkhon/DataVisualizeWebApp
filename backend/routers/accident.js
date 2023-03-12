const express = require('express');
const router = express.Router();
const AccidentController = require('../controllers/AccidentController');

const accidentController = new AccidentController();

router.get('/', accidentController.getAccidentData);
router.post('/', accidentController.insertManyAccidents);

module.exports = router;