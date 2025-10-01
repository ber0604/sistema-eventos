const express = require('express');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');

const UserController = require('../controllers/auth.controller.js');

const router = express.Router();

router.get('', authenticateToken, authorizeRole('admin'), UserController.consultarUsuarios);

module.exports = router;