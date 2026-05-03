const { v4: uuidv4 } = require('uuid');

class Usuario {
  constructor({ nome, email, senha }) {
    this.id = uuidv4();
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }
}

module.exports = Usuario;
