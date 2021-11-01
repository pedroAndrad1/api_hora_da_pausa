const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const DoacaoController = require('../controllers/DoacaoController');

router.use(authMiddleware);
// As rotas abaixo precisam de autenticacao antes
router.post("/doacao", DoacaoController.gerarIntencaoPagamento);
router.post("/callback", DoacaoController.atualizacaoPedido)


module.exports = router;