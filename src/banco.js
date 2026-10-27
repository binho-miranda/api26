import mysql2 from 'mysql2';

const conexao = mysql2.createConnection({
    host : 'localhost',
    user: 'root',
    password: 'Senac@123',
    database: 'api26'
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