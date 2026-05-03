class Produto {
  constructor({ id, nome, preco, quantidade, estoque_minimo, status = 'ATIVO' }) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.quantidade = quantidade;
    this.estoque_minimo = estoque_minimo;
    this.status = status;
  }
}

module.exports = Produto;
