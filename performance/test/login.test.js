import http from 'k6/http'
import { sleep, check } from 'k6'
const postUsuario = JSON.parse(open('../fixtures/postUsuario.json'))
const postLogin = JSON.parse(open('../fixtures/postLogin.json'))
import { pegarBaseURL } from '../utils/variaveis.js'

export const options = {
    vus: 5,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(95)<3000'],
        http_req_failed: ['rate<0.05']
    }
}

export default function () {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    http.post(pegarBaseURL() + '/usuarios', JSON.stringify(postUsuario), params)
    const res = http.post(pegarBaseURL() + '/auth/login', JSON.stringify(postLogin), params)

    check(res, {
        'Validar que o Status é 200': (r) => r.status === 200,
        'Validar que o Token é string': (r) => typeof (r.json('data.token')) == 'string'
    })

    sleep(1)
}
