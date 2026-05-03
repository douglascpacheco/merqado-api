const db = require('../models/db');
const Usuario = require('../models/usuario');

function removerSenha(usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email
  };
}

function createUsuario(data) {
  if (db.usuarios.find(u => u.email === data.email)) {
    throw { status: 400, message: 'Email já cadastrado.' };
  }

  const usuario = new Usuario(data);
  db.usuarios.push(usuario);
  return removerSenha(usuario);
}

module.exports = { createUsuario, removerSenha };
