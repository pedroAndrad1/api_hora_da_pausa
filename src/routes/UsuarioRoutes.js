const express = require('express');
const router = express.Router();
const multer = require('multer');
var upload = multer({ dest: 'assets/avatars' })

const UsuarioController = require('../controllers/UsuarioController');

router.post("/usuario/create", UsuarioController.store);
router.post("/usuario/update", upload.single('foto'), UsuarioController.update);
router.delete("/usuario/delete/:id", upload.single('foto'), UsuarioController.delete);
router.get("/usuario/index", UsuarioController.index);
router.get("/usuario/:id", UsuarioController.getUsuarioById);
router.post("/usuario/login", UsuarioController.login);

module.exports = router;