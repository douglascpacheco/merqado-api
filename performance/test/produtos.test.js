import http from 'k6/http'
import { sleep, check } from 'k6'
import { obterToken } from '../helpers/autenticacao.js'
import { pegarBaseURL } from '../utils/variaveis.js'

export const options = {
    vus: 5,
    duration: '30s'
}

export default function () {
    const token = obterToken()

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    const produto = {
        nome: `Produto Performance ${__VU}-${__ITER}`,
        preco: 10.5,
        quantidade: 20,
        estoque_minimo: 5,
        status: 'ATIVO'
    }

    const post = http.post(pegarBaseURL() + '/produtos', JSON.stringify(produto), params)
    const get = http.get(pegarBaseURL() + '/produtos', params)

    check(post, {
        'Validar que o cadastro retorna 201': (r) => r.status === 201
    })

    check(get, {
        'Validar que a listagem retorna 200': (r) => r.status === 200
    })

    sleep(1)
}
