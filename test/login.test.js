const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');
require('dotenv').config();
const { usuarioValido } = require('../fixtures/postUsuario.json');
const { usuarioValido: loginValido, usuarioInvalido } = require('../fixtures/postLogin.json');

describe('Login', () => {
    describe('POST /usuarios', () => {
        it('Deve cadastrar usuário com sucesso', async () => {
            const resposta = await request(app)
                .post('/usuarios')
                .set('Content-Type', 'application/json')
                .send(usuarioValido)

            expect(resposta.status).to.be.equal(201)
            expect(resposta.body).to.have.property('message', 'Operação realizada com sucesso')
            expect(resposta.body.data).to.have.property('email', usuarioValido.email)
            expect(resposta.body.data).to.not.have.property('senha')
        })
    })

    describe('POST /auth/login', () => {
        it('Deve realizar login com sucesso', async () => {
            const resposta = await request(app)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send(loginValido)

            expect(resposta.status).to.be.equal(200)
            expect(resposta.body.data.token).to.be.a('string')
        })

        it('Deve bloquear login inválido', async () => {
            const resposta = await request(app)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send(usuarioInvalido)

            expect(resposta.status).to.be.equal(401)
            expect(resposta.body).to.have.property('error', 'Credenciais inválidas.')
        })
    })

    describe('GET /produtos', () => {
        it('Deve bloquear acesso sem token em rota protegida', async () => {
            const resposta = await request(app)
                .get('/produtos')

            expect(resposta.status).to.be.equal(401)
            expect(resposta.body).to.have.property('error', 'Token não fornecido.')
        })
    })
})
