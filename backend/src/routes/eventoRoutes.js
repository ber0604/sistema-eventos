const express = require('express');

const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');

const EventosController = require('../controllers/eventos.controller.js');

const router = express.Router();

router.get('/consultar', authenticateToken, EventosController.consultarEventos);
router.delete('/:id', authenticateToken, EventosController.excluirEvento);
router.post('/registrar', authenticateToken, authorizeRole('admin'), EventosController.register);

module.exports = router;