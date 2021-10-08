const Usuario = require('../models/Usuario');
// formula pra calcular xp para subir de nivel (10 ^ (1 + Level / 20)) * 100
module.exports = {
    
    // Cadastra um Usuario no banco
    async store(req, res){
        const {nome, email, senha} = req.body;
        // Se nao tiver um dos campos, entao o usuario e invalido.
        if(!nome || !email || !senha){
            res.status(400).json({
                message: 'Nome, email e senha são obrigatórios!'
            })
            return;
        }

        // Se já existir um usuario com esse email cadastrado, entao lance um erro
        const hasUsuarioDeMesmoEmail = await Usuario.findOne({where: {email}});
        if(hasUsuarioDeMesmoEmail){
            res.status(400).json({
                message: 'Já existe um usuario com esse email cadastrado'
            })
            return;
        }

        await Usuario.create({
            nome,
            senha,
            email,
            isLogged: false,
            nivel: 1,
            xp: 0,
            xp_para_subir_de_nivel: Math.round(Math.pow(10, 2/20) * 100 ),
            doador: false,
            quant_exercicios_feitos: 0
        })
        .then(novoUsuario =>{
            res.status(200).json(novoUsuario)
        })
        .catch( err =>{
            console.log(err);
            res.status(500).json({
                message: 'Não foi possível realizar o cadastro!',
            })
        })
    }
}