const request = require('supertest');
const app = require('../src/app');
const { usuarioHelper } = require('../fixtures/postUsuario.json');

const obterToken = async () => {
    const respostaLogin = await request(app)
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            email: usuarioHelper.email,
            senha: usuarioHelper.senha
        })

    if (respostaLogin.status === 200) {
        return respostaLogin.body.data.token
    }

    await request(app)
        .post('/usuarios')
        .set('Content-Type', 'application/json')
        .send(usuarioHelper)

    const respostaLoginCriado = await request(app)
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            email: usuarioHelper.email,
            senha: usuarioHelper.senha
        })

    return respostaLoginCriado.body.data.token
}

module.exports = {
    obterToken
}
