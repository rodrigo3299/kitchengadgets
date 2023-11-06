//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;


//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/kitchengadgets',
{   
    useNewUrlParser: true,
    useUnifiedTopology: true
    
});




const UsuarioSchema = new mongoose.Schema({
    senha : {type : String},
    email : {type : String, required : true},
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

//configurando os roteamentos
app.post("/cadastrousuario", async(req, res)=>{
    const senha = req.body.senha;
    const email = req.body.email;


const usuario = new Usuario({
        senha : senha,
        email : email
    
    })

    try{
        const newUsuario = await usuario.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
    } catch(error){
       }

});

const ProdutocozinhaSchema = new mongoose.Schema({
id_produtocozinha : {type : String},
descricao : {type : String},
marca : {type : String, required : true},
data_fabricacao : {type : Date, required : true},
quantidade_estoque : {type : Number},
});

const Produtocozinha = mongoose.model("Produtocozinha", ProdutocozinhaSchema);

//configurando os roteamentos
app.post("/cadastroproduto", async(req, res)=>{
    const id_produtocozinha = req.body.id_produtocozinha;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const data_fabricacao = req.body.data_fabricacao;
    const quantidade_estoque = req.body.quantidade_estoque;
    

const produtocozinha = new Produtocozinha({
        id_produtocozinha : id_produtocozinha,
        descricao : descricao,
        marca : marca,
        data_fabricacao : data_fabricacao,
        quantidade_estoque : quantidade_estoque
    
    })

    try{
        const newProdutocozinha = await produtocozinha.save();
        res.json({error : null, msg : "Cadastro ok", ProdutocozinhaId : newProdutocozinha._id});
    } catch(error){
       }

});


app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
})

//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})
