const express = require('express');

const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');

const EventosController = require('../controllers/eventos.controller.js');

const router = express.Router();

router.get('/consultar', authenticateToken, EventosController.consultarEventos);
router.post('/registrar', authenticateToken, authorizeRole, EventosController.register);

module.exports = router;