const express = require('express');
const OngController = require('./controller/OngController');
const IncidentsController = require('./controller/IncidentController')
const ProfileController = require('./controller/ProfileControler')
const SessionsController = require('./controller/SessionControler')

const routes = express.Router();

routes.get('/sessions',SessionsController.create)

routes.get('/ongs',OngController.index);
routes.post('/ongs',OngController.create);

routes.post('/incidents', IncidentsController.create )
routes.get('/incidents', IncidentsController.index )
routes.delete('/incidents/:id', IncidentsController.delete )

routes.get('/profile',ProfileController.index)
module.exports = routes;
