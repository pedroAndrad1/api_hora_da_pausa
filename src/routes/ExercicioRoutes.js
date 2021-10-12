const express = require('express');
const ExercicioController = require('../controllers/ExercicioController');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);
// As rotas abaixo precisam de autenticacao antes
router.get("/exercicio", ExercicioController.getExercicio);
router.get("/exercicio/:tipo_exercicio", ExercicioController.getExercicioByTipo);

module.exports = router;