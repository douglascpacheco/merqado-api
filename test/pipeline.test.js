const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');
require('dotenv').config();
const { usuarioPipeline } = require('../fixtures/postUsuario.json');
const { usuarioPipeline: loginPipeline } = require('../fixtures/postLogin.json');

describe('Execução testes Pipelines', () => {
    describe('POST /usuarios', () => {
        it('Deve cadastrar usuário com sucesso', async () => {
            const resposta = await request(app)
                .post('/usuarios')
                .set('Content-Type', 'application/json')
                .send(usuarioPipeline)

            expect(resposta.status).to.be.equal(201)
            expect(resposta.body.data).to.have.property('email', usuarioPipeline.email)
        })
    })

    describe('POST /auth/login', () => {
        it('Deve realizar login com sucesso', async () => {
            const resposta = await request(app)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send(loginPipeline)

            expect(resposta.status).to.be.equal(200)
            expect(resposta.body.data.token).to.be.a('string')
        })
    })
})
