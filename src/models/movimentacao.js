class Movimentacao {
  constructor({ id, produto_id, tipo, quantidade }) {
    this.id = id;
    this.produto_id = produto_id;
    this.tipo = tipo;
    this.quantidade = quantidade;
    this.data = new Date().toISOString();
  }
}

module.exports = Movimentacao;
