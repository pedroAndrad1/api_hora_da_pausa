// Esta funcao intercepta as requests que o servidor recebe, antes de passar para ele.
// E preciso passar ela para as rotas.

// pode usar um router.use(esse_middleware) tbm. Assim, todas as rotas abaixo deste comando terao
// o middleware
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: 'No token provider' });
    }
    // Um Bearer token tem o formato Bearer ashfhajrf...
    const parts = authHeader.split(' ');
    // Logo, se ele nao tive duas partes, e um token invalido
    if (!parts.length == 2) {
        return res.status(401).send({ error: 'Token error!' });
    }
    // O Scheme e o Bearer 
    const [scheme, token] = parts;
    // Se a primeira parte nao for um Bearer, o token e invalido
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token mal formatado' });
    }
    // Testa se o token foi criado a partir da chave da app
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        // Se nao for, ele e invalido
        if (err) return res.status(401).send({ error: 'Token inválido' });
        
        // Passa o Id que foi usada para gerar o Token via requisicao
        // criando esse atributo userId
        req.userId = decoded.id;

        return next();
    });

};