const express = require('express');

const UserController = require('../controllers/auth.controller.js');

const router = express.Router();

router.post('/auth', UserController.login);
router.post('/register', UserController.register);

module.exports = router;