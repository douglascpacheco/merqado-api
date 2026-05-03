const jwt = require('jsonwebtoken');
const db = require('../models/db');

const SECRET = 'merqado_secret';

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido.' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido.' });

    const usuario = db.usuarios.find(u => u.id === decoded.id);
    if (!usuario) return res.status(401).json({ error: 'Usuário não encontrado.' });

    req.user = { id: usuario.id, email: usuario.email };
    next();
  });
}

function generateToken(usuario) {
  return jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, { expiresIn: '1d' });
}

module.exports = { authenticate, generateToken };
