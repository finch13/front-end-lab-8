var express = require('express');
var routes = express.Router();
var handlers = require('./controllers/handlers');

routes.get('/rockstars', handlers.all);
routes.get('/rockstar/:id', handlers.findById);

routes.post('/rockstar', handlers.create);
routes.put('/rockstar/:id', handlers.update);
routes.delete('/rockstar/:id', handlers.delete);

module.exports = routes;