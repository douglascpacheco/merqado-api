const bcrypt = require('bcryptjs');
const usuarioService = require('../services/usuarioService');

exports.create = async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ error: 'Campos obrigatórios.' });

    const hash = await bcrypt.hash(senha, 10);
    const usuario = usuarioService.createUsuario({ nome, email, senha: hash });

    res.status(201).json({
      message: 'Operação realizada com sucesso',
      data: usuario
    });
  } catch (err) {
    next(err);
  }
};
