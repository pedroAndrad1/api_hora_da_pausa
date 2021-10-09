const Usuario = require('../models/Usuario');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth.json');
// formula pra calcular xp para subir de nivel (10 ^ (1 + Level / 20)) * 100

const verificaSeUsuarioNaoExiste = async (id, res) => {
    const usuario = await Usuario.findOne({where: {id}});
        if(!usuario){
            res.status(404).json({
                message: 'Usuário não encontrado'
            })
        }
}
// O token expira em 24H
const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 100800,
    });
}
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
            is_logged: false,
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
    },

    async update(req, res) {
        const {id, nome, senha} = req.body;
        let foto = '';
        try{
            foto = fs.readFileSync(req.file.path);
        }
        catch(err){
            console.log("ERRO AQUI ->",err);
            res.json({message: "erro"});
        }

        verificaSeUsuarioNaoExiste(id, res);

        await Usuario.update({
            nome, senha, foto
        }, {where:{id}})
        .then(usuarioAtualizado => {
            console.log(usuarioAtualizado);
            res.status(200).json(usuarioAtualizado);
        })
        .catch( err =>{
            console.log(err);
            res.status(500).json({
                message: 'Não foi possível atualizar o usuário!'
            })
        })
    },

    async delete(req, res) {
        const {id} = req.params;
        verificaSeUsuarioNaoExiste(id, res);

        await Usuario.destroy({where: {id}})
        .then(result =>{
            res.json({
                message: 'Usuário deletado com sucesso!'
            })
        })
        .catch( err =>{
            console.log("ERRO =>", err);
            res.status(500).json({
                message: 'Erro ao deletar usuário!'
            });
        })
    },
    //Retorna todos os usuarios cadastrados
    async index(req, res) {
        await Usuario.findAll()
        .then(result =>{
            res.json(result)
        })
        .catch( err =>{
            console.log("ERRO =>", err);
            res.status(500).json({
                message: 'Erro ao buscar todos os usuarios'
            })
        })
    },
    //Retorna um usuario pelo id
    async getUsuarioById(req, res){
        const {id} = req.params;
        await Usuario.findOne({where: {id}})
        .then(result =>{
            if(!result){
                res.status(404).json({
                    message: 'Usuário não encontrado'
                })
                return;
            }
            
            res.json(result)
        })
        .catch( err =>{
            console.log("ERRO =>", err);
            res.status(500).json({
                message: 'Erro no servidor'
            })
        })
    },
    // Autenticacao
    async login(req, res){
        const {email, senha} = req.body;
        // Verificando se ha um usuario com esse email
        const usuario = await Usuario.findOne({where: {email}});
        if(!usuario){
            res.status(400).json({
                message: 'Email ou senha incorretor!'
            })
            return;
        }
        // Verificando se a senha criptografada bate com a senha ja criptografada no banco
        if (!bcrypt.compareSync(senha, usuario.senha)) {
            return res.status(400).send({
                message: 'E-mail ou senha incorreto!',
            });
        }
        // Se tudo bater, fazer update do status do usuario no banco para logado
        // e devolver um token.
        const id = usuario.id;
        Usuario.update({
            is_logged: true
        }, {where: {id}})// Usei o id em vez do email just in case
        .catch( err =>{
            console.error("ERRO =>",err)
        });
        
        const token = generateToken({ id });

        res.json({
            message: 'Usuário logado com sucesso',
            usuario,
            token
        })
    },
    
}