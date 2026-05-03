const db = require('../models/db');
const Movimentacao = require('../models/movimentacao');

function createMovimentacao(data) {
  const quantidade = Number(data.quantidade);

  if (!['ENTRADA', 'SAIDA'].includes(data.tipo)) throw { status: 400, message: 'Tipo de movimentação inválido.' };
  if (!data.produto_id) throw { status: 400, message: 'Produto obrigatório.' };
  if (data.quantidade === undefined || Number.isNaN(quantidade) || quantidade <= 0) throw { status: 400, message: 'Quantidade deve ser maior que zero.' };

  const produto = db.produtos.find(p => p.id === data.produto_id);
  if (!produto) throw { status: 404, message: 'Produto não encontrado.' };
  if (produto.status !== 'ATIVO') throw { status: 400, message: 'Produto inativo.' };

  if (data.tipo === 'SAIDA' && quantidade > produto.quantidade) {
    throw { status: 400, message: 'Quantidade de saída maior que estoque disponível.' };
  }

  if (data.tipo === 'ENTRADA') produto.quantidade += quantidade;
  if (data.tipo === 'SAIDA') produto.quantidade -= quantidade;

  const movimentacao = new Movimentacao({
    id: `MOV-${String(db.movimentacoes.length + 1).padStart(2, '0')}`,
    produto_id: data.produto_id,
    tipo: data.tipo,
    quantidade
  });

  db.movimentacoes.push(movimentacao);
  return movimentacao;
}

function getMovimentacoes() {
  return db.movimentacoes;
}

module.exports = { createMovimentacao, getMovimentacoes };
