const express = require('express')
const controller = require('../controllers/controller');
const authMiddleware = require('../middleware/auth');


const controllerRouter = express.Router();

controllerRouter.post('/', authMiddleware(), controller.validate)


module.exports = controllerRouter