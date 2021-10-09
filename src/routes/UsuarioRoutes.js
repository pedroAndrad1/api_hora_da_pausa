const express = require('express');
const router = express.Router();
const multer = require('multer');
var upload = multer({ dest: 'assets/avatars' })
const authMiddleware = require('../middlewares/auth');

const UsuarioController = require('../controllers/UsuarioController');

router.post("/usuario/create", UsuarioController.store);
router.get("/usuario/index", UsuarioController.index);
router.get("/usuario/:id", UsuarioController.getUsuarioById);
router.post("/usuario/login", UsuarioController.login);

router.use(authMiddleware);
// As rotas abaixo precisam de autenticacao antes
router.post("/usuario/update", upload.single('foto'), UsuarioController.update);
router.delete("/usuario/delete/:id", upload.single('foto'), UsuarioController.delete);
router.get("/usuario/logoff/:id", UsuarioController.logoff);

module.exports = router;