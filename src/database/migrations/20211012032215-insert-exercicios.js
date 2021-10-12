'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("exercicios",[
      {
        descricao: "Estique um de seus braços com a palma da mão virada para frente e puxe os dedos para cima por 10 segundos por mão.",
        xp: 80,
        tipoExercicio: 'corpo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: "Estique seu braço contra o peito e puxe-o utilizando o outro braço por 10 segundos por braço.",
        xp: 60,
        tipoExercicio: 'corpo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: "Puxe seu pescoço com a ajuda da mão para a direita e para a esquerda, permanecendo na posição por alguns segundos.",
        xp: 70,
        tipoExercicio: 'corpo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: "Com as duas mãos na parte de trás da cabeça, leve-a para baixo, alongando a parte de trás da região.",
        xp: 60,
        tipoExercicio: 'corpo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: "Cruze as pernas e desça com as mãos esticadas em direção ao chão. Repita o movimento com a outra perna na frente.",
        xp: 100,
        tipoExercicio: 'corpo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: "Sentado, abra as pernas e tente encostar as palmas das mãos no chão, repita 3 vezes por 5 segundos.",
        xp: 80,
        tipoExercicio: 'corpo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: "Puxe o joelho de encontro ao peito e segure, troque de perna após 10 segundos.",
        xp: 50,
        tipoExercicio: 'corpo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: "Sentado, cruze uma perna e incline seu tronco à frente, troque de perna após 10 segundos.",
        xp: 80,
        tipoExercicio: 'corpo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: "Em pé, gire a cintura o máximo que puder para a esquerda, segure por cinco segundos. Repita para a direita",
        xp: 90,
        tipoExercicio: 'corpo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: "Sentado, feche os olhos e cubra-os com as palmas da mão durante 2 minutos, depois abra normalmente.",
        xp: 90,
        tipoExercicio: 'olhos',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: "Em algum ambiente aberto, olhe o mais longe que puder em quatro direções por 3s, mexa apenas os olhos. Repita 3 vezes.",
        xp: 140,
        tipoExercicio: 'olhos',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        descricao: "Usando os polegares, massage a área abaixo das sobrancelhas em movimentos circulares por 15 segundos.",
        xp: 70,
        tipoExercicio: 'olhos',
        created_at: new Date(),
        updated_at: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op
    await queryInterface.bulkDelete('exercicios', {id: {[Op.between]: [0, 9999]}}, {})
  }
};
