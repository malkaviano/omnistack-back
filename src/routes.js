const express = require('express');
const ongController = require('./controllers/ong.controller');
const incidentsController = require('./controllers/incident.controller');
const sessionController = require('./controllers/session.controller');

const routes = express.Router();

routes.get('/ongs', ongController.list);
routes.post('/ongs', ongController.create);

routes.get('/incidents', incidentsController.list);
routes.post('/incidents', incidentsController.create);
routes.delete('/incidents/:id', incidentsController.delete);

routes.post('/sessions', sessionController.create);

module.exports = routes;