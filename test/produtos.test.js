const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');
const { produtoValido, produtoPrecoInvalido } = require('../fixtures/postProduto.json');
const putProduto = require('../fixtures/putProduto.json');

describe('Produtos', () => {
    let token
    let produtoId

    before(async () => {
        token = await obterToken()
    })

    describe('POST /produtos', () => {
        it('Deve cadastrar produto com sucesso', async () => {
            const resposta = await request(app)
                .post('/produtos')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(produtoValido)

            produtoId = resposta.body.data.id

            expect(resposta.status).to.be.equal(201)
            expect(resposta.body).to.have.property('message', 'Operação realizada com sucesso')
            expect(resposta.body.data).to.have.property('nome', produtoValido.nome)
        })

        it('Deve bloquear produto com preço inválido', async () => {
            const resposta = await request(app)
                .post('/produtos')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(produtoPrecoInvalido)

            expect(resposta.status).to.be.equal(400)
            expect(resposta.body).to.have.property('error', 'Preço deve ser maior que zero.')
        })

        it('Deve bloquear produto duplicado ativo', async () => {
            const resposta = await request(app)
                .post('/produtos')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(produtoValido)

            expect(resposta.status).to.be.equal(400)
            expect(resposta.body).to.have.property('error', 'Produto já cadastrado.')
        })
    })

    describe('GET /produtos', () => {
        it('Deve listar produtos ativos', async () => {
            const resposta = await request(app)
                .get('/produtos')
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.be.equal(200)
            expect(resposta.body.data).to.be.an('array')
            resposta.body.data.forEach(produto => {
                expect(produto).to.have.property('status', 'ATIVO')
            })
        })

        it('Deve consultar produto por ID', async () => {
            const resposta = await request(app)
                .get(`/produtos/${produtoId}`)
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.be.equal(200)
            expect(resposta.body.data).to.have.property('id', produtoId)
        })
    })

    describe('PUT /produtos', () => {
        it('Deve atualizar produto com sucesso', async () => {
            const resposta = await request(app)
                .put(`/produtos/${produtoId}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(putProduto)

            expect(resposta.status).to.be.equal(200)
            expect(resposta.body.data).to.have.property('nome', putProduto.nome)
            expect(resposta.body.data).to.have.property('preco', putProduto.preco)
        })
    })
})
