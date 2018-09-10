const express = require('express');

const queryController = require('../controllers/query');

const routes = express.Router();

routes.get('/pending', queryController.getPending);
routes.get('/processed', queryController.getProcessed);
routes.get('/errors', queryController.getErrors);

module.exports = routes;
