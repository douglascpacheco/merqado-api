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
        nome: `Produto Movimentacao ${__VU}-${__ITER}`,
        preco: 15.9,
        quantidade: 20,
        estoque_minimo: 5,
        status: 'ATIVO'
    }

    const produtoRes = http.post(pegarBaseURL() + '/produtos', JSON.stringify(produto), params)
    const produtoId = produtoRes.json('data.id')

    const entrada = http.post(pegarBaseURL() + '/movimentacoes', JSON.stringify({
        produto_id: produtoId,
        tipo: 'ENTRADA',
        quantidade: 5
    }), params)

    const saida = http.post(pegarBaseURL() + '/movimentacoes', JSON.stringify({
        produto_id: produtoId,
        tipo: 'SAIDA',
        quantidade: 3
    }), params)

    check(entrada, {
        'Validar entrada com Status 201': (r) => r.status === 201
    })

    check(saida, {
        'Validar saída com Status 201': (r) => r.status === 201
    })

    sleep(1)
}
