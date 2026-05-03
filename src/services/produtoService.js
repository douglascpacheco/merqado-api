const db = require('../models/db');
const Produto = require('../models/produto');

function validarProduto(data) {
  const preco = Number(data.preco);
  const quantidade = Number(data.quantidade);
  const estoqueMinimo = Number(data.estoque_minimo);

  if (!data.nome) throw { status: 400, message: 'Nome obrigatório.' };
  if (data.preco === undefined || Number.isNaN(preco) || preco <= 0) throw { status: 400, message: 'Preço deve ser maior que zero.' };
  if (data.quantidade === undefined || Number.isNaN(quantidade) || quantidade < 0) throw { status: 400, message: 'Quantidade deve ser maior ou igual a zero.' };
  if (data.estoque_minimo === undefined || Number.isNaN(estoqueMinimo) || estoqueMinimo < 0) throw { status: 400, message: 'Estoque mínimo deve ser maior ou igual a zero.' };
  if (data.status === undefined) data.status = 'ATIVO';
  if (!['ATIVO', 'INATIVO'].includes(data.status)) throw { status: 400, message: 'Status inválido.' };
}

function validarNomeDuplicado(nome, id) {
  const produto = db.produtos.find(p => p.nome === nome && p.status === 'ATIVO' && p.id !== id);
  if (produto) throw { status: 400, message: 'Produto já cadastrado.' };
}

function createProduto(data) {
  validarProduto(data);
  validarNomeDuplicado(data.nome);

  const produto = new Produto({
    id: String(db.produtos.length + 1).padStart(2, '0'),
    nome: data.nome,
    preco: Number(data.preco),
    quantidade: Number(data.quantidade),
    estoque_minimo: Number(data.estoque_minimo),
    status: data.status || 'ATIVO'
  });

  db.produtos.push(produto);
  return produto;
}

function getProdutos() {
  return db.produtos.filter(p => p.status === 'ATIVO');
}

function getProduto(id) {
  const produto = db.produtos.find(p => p.id === id);
  if (!produto) throw { status: 404, message: 'Produto não encontrado.' };
  return produto;
}

function updateProduto(id, data) {
  const produto = getProduto(id);
  const novoProduto = { ...produto, ...data };

  validarProduto(novoProduto);
  validarNomeDuplicado(novoProduto.nome, id);

  produto.nome = novoProduto.nome;
  produto.preco = Number(novoProduto.preco);
  produto.quantidade = Number(novoProduto.quantidade);
  produto.estoque_minimo = Number(novoProduto.estoque_minimo);
  produto.status = novoProduto.status;

  return produto;
}

module.exports = { createProduto, getProdutos, getProduto, updateProduto };
