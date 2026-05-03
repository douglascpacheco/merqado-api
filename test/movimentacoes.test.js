const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');
const { produtoMovimentacao, produtoInativo } = require('../fixtures/postProduto.json');
const postMovimentacao = require('../fixtures/postMovimentacao.json');

describe('Movimentações', () => {
    let token
    let produtoId
    let produtoInativoId

    before(async () => {
        token = await obterToken()

        const produto = await request(app)
            .post('/produtos')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(produtoMovimentacao)

        produtoId = produto.body.data.id

        const inativo = await request(app)
            .post('/produtos')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(produtoInativo)

        produtoInativoId = inativo.body.data.id
    })

    describe('POST /movimentacoes', () => {
        it('Deve registrar entrada de estoque', async () => {
            const bodyMovimentacao = { ...postMovimentacao.entrada, produto_id: produtoId }

            const resposta = await request(app)
                .post('/movimentacoes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyMovimentacao)

            expect(resposta.status).to.be.equal(201)
            expect(resposta.body.data).to.have.property('tipo', 'ENTRADA')
        })

        it('Deve registrar saída de estoque', async () => {
            const bodyMovimentacao = { ...postMovimentacao.saida, produto_id: produtoId }

            const resposta = await request(app)
                .post('/movimentacoes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyMovimentacao)

            expect(resposta.status).to.be.equal(201)
            expect(resposta.body.data).to.have.property('tipo', 'SAIDA')
        })

        it('Deve bloquear saída maior que o estoque disponível', async () => {
            const bodyMovimentacao = { ...postMovimentacao.saidaMaiorEstoque, produto_id: produtoId }

            const resposta = await request(app)
                .post('/movimentacoes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyMovimentacao)

            expect(resposta.status).to.be.equal(400)
            expect(resposta.body).to.have.property('error', 'Quantidade de saída maior que estoque disponível.')
        })

        it('Deve bloquear movimentação de produto inativo', async () => {
            const bodyMovimentacao = { ...postMovimentacao.entrada, produto_id: produtoInativoId }

            const resposta = await request(app)
                .post('/movimentacoes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyMovimentacao)

            expect(resposta.status).to.be.equal(400)
            expect(resposta.body).to.have.property('error', 'Produto inativo.')
        })
    })

    describe('GET /movimentacoes', () => {
        it('Deve listar histórico de movimentações', async () => {
            const resposta = await request(app)
                .get('/movimentacoes')
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.be.equal(200)
            expect(resposta.body.data).to.be.an('array')
        })
    })
})
