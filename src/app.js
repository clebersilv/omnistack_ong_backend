const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());

const prefix = '/api/v0';

const routeOngs = require('./router/ongs_route');
const routeSession = require('./router/session_route');
const routeIncidents = require('./router/incident_route');

app.all('/api/v0', function (req, res, next) {
    console.log('Accessing the secret section ...');
    next();
});


/**
 * Route to HealthCheck (GET http://localhost:3000/)
 */
app.get('/', (req, res) => {
  return res.json({
    message: 'Service GET is alive. Powered by Node Express ',
  });
});


/**
 * Route to HealthCheck (POST http://localhost:3000/)
 */
app.post('/', (req, res) => {
  return res.json({
    message: 'Service POST is alive. Powered by Node Express ',
  });
});


// app.use(routeSwagger); // Rotas Swager
app.use(prefix, [routeSession, routeOngs, routeIncidents]); // Rotas API
app.use(errors()); //Validação do celebrate. Sempre abaixo das rotas

module.exports = app;