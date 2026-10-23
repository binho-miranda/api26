import conexao from './banco.js';

// Abaixo a função ler, que vai ler os alunos do banco (no momento inicial não temos nenhum aluno criado).
function ler(res){
    const sql = "SELECT * FROM alunos ORDER BY nome";

	// A linha abaixo conecta ao banco de dados e executa o comando armazenado na constante sql e em seguida executa uma função que verifica se tem erro ou resultados. resultados retorna uma array com a quantidade de registros e por isso usamos .length nele. Conexao veio do arquivo banco.js e query equivale ao execute() no PHP. 

    conexao.query(sql, (erro, resultados) => {
        if(resultados.length === 0){
            res.status(204).end();    // STATUS 204 = sem conteúdo. Uma das regras do REST é indicar como código de status além da mensagem que já fazemos. Assim quem está usando a API pode fazer o que desejar com isso. O método .end() para qualquer comunicação.
            return;  // equivalente a função die(), exit do php. Precisamos dele porque a função no acaba aqui, assim garantimos que ele não siga a execução. Mata o processo.
        }

        if(erro) {
            res.status(400).json(erro.code)  // 400 BAD REQUEST - requisição inválida. Na documentação do SQL2 deixa claro que esse erro (deste if) é um objeto, por isso usamos erro.code (para exibir exatamente esse propriedade do objeto). json é o formato em que o conteúdo será entregue.
        } else {
            res.status(200).json(resultados); // deu tudo certo e vamos exibir os resultados.
        }
    });
}








function inserir(aluno, res) {
    const sql =  "INSERT INTO alunos SET ?";  // o MYSQL2 com o "SET ?" faz com que o MYSQL entenda que todos os dados recebidos pela função serão atribuídas na ordem, para os campos da tabela. Já cuida de SQL Injections e faz o tratamento das strings.
    
    
    // Chamando conexão.query a função recebe os dados do parâmetro aluno e depois temos a função. Não vamos passar o parâmetro de resultado porque vamos apena inserir dados na tabela

    conexao.query(sql, aluno, (erro) => {
        if(erro) {
            res.status(400).json(erro.code);
        } else {
            res.status(201).json({ "status" : "aluno inserido!"});    // 201 responde como criado. O 200 funcionaria também. E acrescenta um objeto personalizado com uma mensagem amigável.
            
			// ou res.status(201).end(); que funcionaria, sem qualquer mensagem adicional. 
        }
    })
}


// Exportamos as funções
export { ler, inserir };
