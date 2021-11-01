const Usuario = require('../models/Usuario');
const URL_PICPAY = 'https://appws.picpay.com/ecommerce/public';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async gerarIntencaoPagamento(req, res){
        const {id_user, nome, valor, cpf} = req.body;

        let usuario_email = '';
        let usuarioEcontrado = true;

        //Pegando o email do usuario pelo id para mandar na request pro picpay
        await Usuario.findOne({where:{id: id_user}})
            .then(usuario =>{;
               usuario_email = usuario.dataValues.email;
            })
            .catch(err => {
                res.status(404).json({message: "Usuário não encontrado"});
                usuarioEcontrado = false;
            });

        if(!usuarioEcontrado) return;    

        let response;
        const requestBody = JSON.stringify({
            "referenceId": uuidv4(),
            "callbackUrl": "http://localhost:3333/callback",
            "returnUrl": "http://localhost:3000",
            "value": valor,
            "expiresAt": "2022-05-01T16:00:00-03:00",
            "channel": "my-channel",
            "purchaseMode": "in-store",
            "buyer": {
                "firstName": nome,
                "lastName": "",
                "document": cpf,
                "email": usuario_email,
                "phone": ""
            }
        });

        try{
            response = await fetch(`${URL_PICPAY}/payments`,
                {   
                    method: 'post',
                    headers:{
                        'x-picpay-token': 'b37ebac0-939e-47b5-a0af-a0f6ab264146',
                        'Content-Type': 'application/json'
                    },
                    body: requestBody
                }
            )
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: "Erro no servidor do picpay"});
        }

        const data = await response.json();
        
        res.json(data);
    },
    async atualizacaoPedido(req, res){
        // Em tese, eu deveria checar se o x-seller-token vindo no header da request
        // bate com o meu. Mas como so eu vou usar isso, para evitar problemas inesperados,
        // abri mao dessa verifacao.
        
        // CHECAR PELO REFERENCEID DA TRANSACAO SE A DOACAO FOI REALIZADA COM SUCESSO JA

        res.status(200);
    }

}