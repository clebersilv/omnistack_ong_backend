const express = require('express');
const Controller = require('../controllers/OngController');

const validator = require('../validator/index');

const router = express.Router();

/**
 * Route to HelthCheck (GET http://localhost:3333/api/v0/)
 */
router.get('/', (req, res) => {
  return res.json({
    message: 'Service GET is alive. Powered by Node Express ',
  });
});


/**
 * Route to HelthCheck (POST http://localhost:3333/api/v0/)
 */
router.post('/', (req, res) => {
  return res.json({
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


router.get('/ongs', Controller.list);
router.post('/ongs', validator.postValidateONG(), Controller.create);


module.exports = router;