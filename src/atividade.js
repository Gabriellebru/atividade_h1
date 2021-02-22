const { request, response } = require('express');
const express = require('express');
const app = express();
const { uuid } = require('uuidv4');

app.use(express.json());

app.get('/teste', (request, response)=>{
    return response.json({"message":"ta funcionando!"});
});

app.listen(3000, () => {
    console.log("Server running...");
});

const repositories = [];

app.post('/', (request, response)=>{
    const {nome,cpf,email,peso,altura } = request.body;
    const novaPessoa = {id: uuid(), nome, cpf, email, peso, altura, imc: IMC(altura,peso)};
    repositories.push(novaPessoa);
    return response.json({novaPessoa});
});

app.get('/', (request, response)=>{
    return response.json({repositories});
});

app.get('/:cpf', (request, response)=>{
    
    repositories.forEach(pessoa => {    
        if(pessoa.cpf == request.params.cpf){
            return response.json({pessoa});
        }
    });
});


//funções

const IMC = (altura, peso)=>{
    return peso / (altura * altura);
}