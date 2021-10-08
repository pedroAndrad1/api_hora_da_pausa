const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');

router.post("/usuario/create", UsuarioController.store);

module.exports = router;