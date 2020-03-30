const express = require('express');
const Controller = require('../controllers/SessionController');

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


router.post('/sessions', Controller.create);


module.exports = router;