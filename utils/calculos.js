// Calcula el total estimado aplicando combos 2x1000
export function calcularTotalEstimado(listaDeItems) {
  let totalBolsas = listaDeItems.reduce((acc, item) => acc + item.cantidad, 0);
  let combos = Math.floor(totalBolsas / 2);
  let sueltas = totalBolsas % 2;
  return combos * 1000 + sueltas * 600;
}

// Calcula el costo total de la venta (suma de cada bolsa x costo)
export function calcularCostoTotal(listaDeItems) {
  return listaDeItems.reduce((acc, item) => acc + item.cantidad * item.precioCompraUnitario, 0);
}

// Calcula la ganancia
export function calcularGanancia(totalIngresado, costoTotal) {
  return totalIngresado - costoTotal;
}