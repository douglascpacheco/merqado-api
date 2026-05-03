import http from 'k6/http'
const postUsuario = JSON.parse(open('../fixtures/postUsuario.json'))
const postLogin = JSON.parse(open('../fixtures/postLogin.json'))
import { pegarBaseURL } from '../utils/variaveis.js'

export function obterToken() {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    http.post(pegarBaseURL() + '/usuarios', JSON.stringify(postUsuario), params)
    const res = http.post(pegarBaseURL() + '/auth/login', JSON.stringify(postLogin), params)

    return res.json('data.token')
}
