const express = require('express');
const router = express.Router();
const multer = require('multer');
var upload = multer({ dest: 'assets/avatars' })

const UsuarioController = require('../controllers/UsuarioController');

router.post("/usuario/create", UsuarioController.store);
router.post("/usuario/update", upload.single('foto'), UsuarioController.update);
router.delete("/usuario/delete/:id", upload.single('foto'), UsuarioController.delete);

module.exports = router;