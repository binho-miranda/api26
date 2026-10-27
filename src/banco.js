import mysql2 from 'mysql2';

const conexao = mysql2.createConnection({
    host : '192.185.215.58',
    user: 'kuart612_tecbin',
    password: 'senacpenha',
    database: 'kuart612_tec-teste'
});

// conexao.connect();

conexao.connect( erro => {
    if(erro){
        console.error(`Erro ao conectar: ${erro.message}`);  // mensagem de erro mais amigável
    } else {
        console.log(`Banco conectado em: ${conexao.config.host}`);
    }
});

export default conexao;