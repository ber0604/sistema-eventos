const express = require('express');

const EventoController = require('../controllers/auth.controller.js');

const router = express.Router();

router.get('/eventos', EventoController.login);
router.post('/eventos', EventoController.register);

module.exports = router;