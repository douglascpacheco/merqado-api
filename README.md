<h1 align="center">MerQAdo</h1>

<p align="center">
  Gestao de estoque com qualidade.
</p>

## Funcionalidades

* Cadastro e autenticacao de usuarios
* Cadastro, consulta e atualizacao de produtos
* Registro de movimentacoes de entrada e saida
* Historico de movimentacoes de estoque
* Autenticacao via JWT
* Documentacao Swagger interativa

## Stack Utilizada

* **Linguagem:** JavaScript (Node.js)
* **Principais bibliotecas:**

  * [Mocha](https://mochajs.org/)
  * [Supertest](https://github.com/visionmedia/supertest)
  * [Chai](https://www.chaijs.com/)
  * [dotenv](https://github.com/motdotla/dotenv)
  * [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
  * [mochawesome](https://github.com/mochawesome/mochawesome)
  * [k6](https://k6.io/)

## Estrutura de Diretorios

```
merqado-api/
|-- .github/
|   |-- workflows/
|       |-- main.yml
|-- fixtures/
|-- helpers/
|-- index.js
|-- package.json
|-- performance/
|   |-- fixtures/
|   |-- helpers/
|   |-- test/
|   |-- utils/
|-- README.md
|-- resources/
|   |-- swagger.json
|-- src/
|   |-- app.js
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- server.js
|   |-- services/
|-- test/
```

## Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteudo:

```
BASE_URL=http://localhost:3000
```

## Comandos para Execucao dos Testes

* Executar todos os testes funcionais:

  ```bash
  npm test
  ```

* Gerar relatorio HTML com Mochawesome:

  ```bash
  npm run test:report
  ```

* Executar testes de performance:

  ```bash
  npm run test:performance
  ```

## Como Rodar a API

1. Instale as dependencias:

   ```bash
   npm install
   ```

2. Inicie a API:

   ```bash
   npm start
   ```

3. Acesse a documentacao Swagger em:

   ```
   http://localhost:3000/swagger
   ```

## Observacoes

* Banco de dados em memoria.
* Dados sao perdidos ao reiniciar a aplicacao.
* Projeto independente criado com base nos padroes do portifolio FielScore.
