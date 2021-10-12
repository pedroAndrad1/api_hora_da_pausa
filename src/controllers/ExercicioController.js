const Usuario = require('../models/Usuario');
const Exercicio = require('../models/Exercicio');

const verificaSeUsuarioNaoExiste = async (id, res) => {
    const usuario = await Usuario.findOne({where: {id}});
        if(!usuario){
            res.status(404).json({
                message: 'Usuário não encontrado'
            })
        }
}
// Retorno um numero aleatorio entre dois valores, inclusive estes.
// Peguei este function da doc de Math.random()
const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
// formula pra calcular xp para subir de nivel (10 ^ (1 + Level / 20)) * 100

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
    }
}