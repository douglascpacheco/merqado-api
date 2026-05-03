const movimentacaoService = require('../services/movimentacaoService');

exports.create = (req, res, next) => {
  try {
    const { produto_id, tipo, quantidade } = req.body;
    if (!produto_id || !tipo || quantidade === undefined) {
      return res.status(400).json({ error: 'Campos obrigatórios.' });
    }

    const movimentacao = movimentacaoService.createMovimentacao({ produto_id, tipo, quantidade });
    res.status(201).json({
      message: 'Operação realizada com sucesso',
      data: movimentacao
    });
  } catch (err) {
    next(err);
  }
};

exports.list = (req, res, next) => {
  try {
    const movimentacoes = movimentacaoService.getMovimentacoes();
    res.json({
      message: 'Operação realizada com sucesso',
      data: movimentacoes
    });
  } catch (err) {
    next(err);
  }
};
