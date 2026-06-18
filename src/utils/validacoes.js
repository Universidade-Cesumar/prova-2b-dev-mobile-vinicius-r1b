function validarRetirada(estoqueAtual, quantidadeSolicitada) {
  const estoque = Number(estoqueAtual);
  const solicitada = Number(quantidadeSolicitada);

  if (!Number.isFinite(estoque) || !Number.isFinite(solicitada)) {
    return false;
  }

  if (solicitada <= 0) {
    return false;
  }

  return solicitada <= estoque;
}

module.exports = {
  validarRetirada,
};