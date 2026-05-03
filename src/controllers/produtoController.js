const produtoService = require('../services/produtoService');

exports.create = (req, res, next) => {
  try {
    const { nome, preco, quantidade, estoque_minimo, status } = req.body;
    if (!nome || preco === undefined || quantidade === undefined || estoque_minimo === undefined) {
      return res.status(400).json({ error: 'Campos obrigatórios.' });
    }

    const produto = produtoService.createProduto({ nome, preco, quantidade, estoque_minimo, status });
    res.status(201).json({
      message: 'Operação realizada com sucesso',
      data: produto
    });
  } catch (err) {
    next(err);
  }
};

exports.list = (req, res, next) => {
  try {
    const produtos = produtoService.getProdutos();
    res.json({
      message: 'Operação realizada com sucesso',
      data: produtos
    });
  } catch (err) {
    next(err);
  }
};

exports.get = (req, res, next) => {
  try {
    const produto = produtoService.getProduto(req.params.id);
    res.json({
      message: 'Operação realizada com sucesso',
      data: produto
    });
  } catch (err) {
    next(err);
  }
};

exports.update = (req, res, next) => {
  try {
    const produto = produtoService.updateProduto(req.params.id, req.body);
    res.json({
      message: 'Operação realizada com sucesso',
      data: produto
    });
  } catch (err) {
    next(err);
  }
};
