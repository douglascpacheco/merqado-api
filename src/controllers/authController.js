const bcrypt = require('bcryptjs');
const db = require('../models/db');
const { generateToken } = require('../middleware/auth');

exports.login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: 'Campos obrigatórios.' });

    const usuario = db.usuarios.find(u => u.email === email);
    if (!usuario) return res.status(401).json({ error: 'Credenciais inválidas.' });

    const valid = await bcrypt.compare(senha, usuario.senha);
    if (!valid) return res.status(401).json({ error: 'Credenciais inválidas.' });

    const token = generateToken(usuario);
    res.json({
      message: 'Operação realizada com sucesso',
      data: { token }
    });
  } catch (err) {
    next(err);
  }
};
