import express from "express";
import cors from "cors";
import { ler, inserir } from './src/aluno.js';
const app = express();
const porta = process.env.PORT || 3000;



app.use(express.json());
app.use( express.urlencoded({extended:true}) );
app.use(cors());

// configurando Rotas

// rota para página/mensaagem inicial
app.get('/', (req, res) => {
    res.send(`API de alunos com Node.JS, Express e MySQL`);
});


// GET: rota para exibir TODOS os alunos
app.get('/alunos', (req, res) => {
    // res.send(`Dados de todos os alunos da API / BD`)
    ler(res);
})

// GET: rota para exibir dados de UM aluno/a
// na sintaxe do Express é obrigatório ter os : antes do id para funcionar
app.get('/alunos/:id', (req, res) => {
    res.send(`Dados de UM aluno`);
})

// POST: Endpoint para inserir novos alunos
app.post('/alunos/:id', (req, res) => {
    // res.send('Inserindo UM aluno.');
    // capturando os dados a partir do corpo da requisição (pode ou não aparecer em uma variável).
    const novoAluno = req.body;  // diferente do php onde é preciso acessar o parâmetro do post. Aqui body já traz todos os dados do corpo (esses dados são o objeto que preenchemos via json ou formulário na hora de testar no Insomnia ou Postman).

    // exceutando a funçãp inserir e passando os parâmetros novoAluno e res. Lembrando que no aluno.js a função espera receber duas informações aluno (que recebe novoALuno criado aqui e com os dados preenchidos do aluno que quero cadastrar) e res (resposta da requisição).
    inserir(novoAluno, res);

})

// PUT:  Endpoint para atualizar TODOS os dados de UM aluno
app.put('/alunos/:id', (req, res) => {
    res.send('Atualizar TODOS os dados de UM aluno.');
})

// PATCH:  Endpoint para atualizar todos/alguns dados de UM aluno
app.patch('/alunos/:id', (req, res) => {
    res.send('Atualizar alguns ou todos os dados de UM aluno.');
})

// DELETE:  Endpoint para excluir alunos
app.delete('/alunos/:id', (req, res) => {
    res.send('Excluir UM aluno.');
})




// configurando a execução do servidor Express
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
})