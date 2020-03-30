const express = require('express');
const Controller = require('../controllers/IncidentController');
const ProfileController = require('../controllers/IncidentProfileController');

const validator = require('../validator/index');

const router = express.Router();

/**
 * Route to HelthCheck (GET http://localhost:3333/api/v0/)
 */
router.get('/', (req, res) => {
  res.json({
    message: 'Service GET is alive. Powered by Node Express ',
  });
});


/**
 * Route to HelthCheck (POST http://localhost:3333/api/v0/)
 */
router.post('/', (req, res) => {
  res.json({
    message: 'Service POST is alive. Powered by Node Express ',
  });
});


/**
 * Middleware that is specific to this router
 */
router.use(function timeLog(req, res, next) {
  // console.log('>>>>> Middleware');
  next();
});


router.get('/incidents', validator.getValidateIncidentPage(), Controller.list);
router.get('/profile', validator.getValidateProfile(), ProfileController.list);
router.post('/incidents', Controller.create);
router.delete('/incidents/:id', validator.deleteValidateIncident(), Controller.delete);


module.exports = router;