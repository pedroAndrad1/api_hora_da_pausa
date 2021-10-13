const Usuario = require('../models/Usuario');
const Exercicio = require('../models/Exercicio');
const Ciclo = require('../models/Ciclo');
const Sequelize = require('sequelize').Sequelize;

const getUsuarioById = async (id, res) => {
    let usuario = null;
    await Usuario.findOne({where: {id}})
    .then(result => usuario = result)
    .catch(err => {
        console.error(err);
    })
    
    if(!usuario){
        res.status(404).json({
            message: 'Usuário não encontrado'
        })
    }

    return usuario;
}

const getExercicioById = async (id, res) => {
    let exercicio = null; 
    
    await Exercicio.findOne({where: {id}})
    .then(result => exercicio = result)
    .catch(err => {
        console.error(err);
    })
    
    if(!exercicio){
        res.status(404).json({
            message: 'Exercício não encontrado!'
        })
    }

    return exercicio;
}

const hasLevelUp = (xpAtual, xpParaUpar, xpRecebido) => {
    if(xpAtual + xpRecebido >= xpParaUpar){
        return true;
    }
    else{
        return false;
    }
}
// Retorno um numero aleatorio entre dois valores, inclusive estes.
// Peguei este function da doc de Math.random()
const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

module.exports = {
    // Retorna um exercicio aleatorio
    async getExercicio(req, res){
        // Os id's dos registros comecam de 1, logo a quantidade de registros = maior id
        const maxId = await Exercicio.count();
        // Selecionando o id de um exercicio aleatorio
        const randomExercicioId = getRandomIntInclusive(1, maxId);
        // Pegando o exercicio pelo id selecionado randomicamente
        await Exercicio.findOne({where: {id: randomExercicioId}})
        .then(exercicioAleatorio => {
            res.json(exercicioAleatorio);
        })
        .catch( err =>{
            console.log("ERRO getExercicio =>", err);
            res.status(500).json({
                message: 'Erro ao selecionar exercício!'
            })
        });
    },

    // Retorna um exercicio aleatorio de um tipo
    async getExercicioByTipo(req, res){
        const {tipo_exercicio} = req.params;

        if(tipo_exercicio != "olhos" && tipo_exercicio != "corpo" ){
            res.status(400).json({
                message: 'Tipo de exercício inválido, tente olhos ou corpo!'
            })
        }

        Exercicio.findAll({
            where:{tipo_exercicio},
            order: Sequelize.literal('rand()'), 
            limit: 1
        })
        .then(exercicioAleatorio =>{
            res.json(exercicioAleatorio);
        })
        .catch( err =>{
            console.log("ERRO getExercicioByTipo =>", err);
            res.status(500).json({
                message: 'Erro ao selecionar exercício!'
            })
        });
    },
    // Realiza um exercicio e atribui a xp dele a um usuario
    // FUNCTION MUITO GRANDE, NECESSARIO REFATORAR!!!!!!!!!! 
    async realizarExercicio(req, res){
        //Variavel de controle
        let cicloSalvoComSucesso = true;
        const {usuario_id, exercicio_id, intervalo} = req.body;
        // Verificando se existe o usuario
        const usuario = await getUsuarioById(usuario_id, res);

        if(!usuario) return;

        // verificando se existe o exercicio
        const exercicio = await getExercicioById(exercicio_id, res);

        if(!exercicio) return;

        // Salvando o ciclo
        await Ciclo.create({
            usuario_id,
            exercicio_id,
            intervalo
        })
        .catch(err => {
            console.log("ERRO =>", err);
            cicloSalvoComSucesso = false;
            res.status(500).json({
                message: 'Não foi possível realizar o exercício (erro ao salvar ciclo)'
            })
        })

        if(cicloSalvoComSucesso == false) return;

        // console.log("Usuario =>", usuario);
        // console.log("Exercicio =>", exercicio);
        // Verificando se o Usuario vai upar ao realizar esse exercicio.
        // Se sim, fazer update do usuario com o level up.
        // Senao, so fazer update com o xp e nova quantidade de exercicios feitos.
        const novaQuantidadeDeExerciciosFeitos = usuario.dataValues.quant_exercicios_feitos + 1;

        if(hasLevelUp(usuario.dataValues.xp, usuario.dataValues.xp_para_subir_de_nivel, exercicio.dataValues.xp )){
            const novoXp = ( usuario.dataValues.xp + exercicio.dataValues.xp) - usuario.dataValues.xp_para_subir_de_nivel;
            const novoNivel = usuario.dataValues.nivel + 1;
            // formula pra calcular xp para subir de nivel (10 ^ (1 + Level / 20)) * 100
            const novoXpParaSubirDeNivel = Math.round(Math.pow(10, (1 + novoNivel) / 20) * 100);
            await Usuario.update({
                nivel: novoNivel,
                xp: novoXp,
                xp_para_subir_de_nivel: novoXpParaSubirDeNivel,
                quant_exercicios_feitos: novaQuantidadeDeExerciciosFeitos
            } , {where: {id: usuario_id}})
            .then( async () =>{
                // Retornando o usuario atualizado
                await Usuario.findOne({where: {id: usuario_id}})
                .then( result =>{
                    res.json({
                        levelUp: true,
                        usuario: result
                    })
                })
                .catch( err =>{
                    console.log(err);
                    res.status(500).json({
                        message: 'Não foi possível realizar o exercício!'
                    })
                })
            })
            .catch( err =>{
                console.log(err);
                res.status(500).json({
                    message: 'Não foi possível realizar o exercício!'
                })
            })
        }
        else{
            const novoXp = usuario.dataValues.xp + exercicio.dataValues.xp;
            
            await Usuario.update({
                xp: novoXp,
                quant_exercicios_feitos: novaQuantidadeDeExerciciosFeitos
            } , {where: {id: usuario_id}})
            .then( async () =>{
                // Retornando o usuario atualizado
                await Usuario.findOne({where: {id: usuario_id}})
                .then( result =>{
                    res.json({
                        levelUp: false,
                        usuario: result
                    })
                })
                .catch( err =>{
                    console.log(err);
                    res.status(500).json({
                        message: 'Não foi possível realizar o exercício!'
                    })
                })
            })
            .catch( err =>{
                console.log(err);
                res.status(500).json({
                    message: 'Não foi possível realizar o exercício!'
                })
            })
        }
    }
}