const express = require('express')
const bodyParser = require('body-parser')

const app = express()

//usar o bodyParser em um middleware
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) =>{//envia uma resposta para a requisição do cliente
    res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email">
            <input type="password" name="senha" placeholder="Senha">
            <input name="confirmSenha" placeholder="Confirmar Senha">
            <button>Cadastrar</button>
        </form> 
    </div>
    `) //quando clicamos no botao o método envia as informações para o POST, que crava no BD
})

app.post('/', (req,res) =>{
    console.log(req.body)
    res.send('tudo certo, olhe o console')
})


var portaServidor = 3003
app.listen(portaServidor, ()=>{
    console.log(`Servidor rodando na porta ${portaServidor}`)
})