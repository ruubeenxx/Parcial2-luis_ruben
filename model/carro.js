
class Carro extends Vehiculo {
  constructor(placa, propietario, horasEstacionado, tarifaBase, numeroPuertas) {
    super(placa, propietario, horasEstacionado, tarifaBase, 'C');
    this.numeroPuertas = numeroPuertas;
  }

  calcularTarifaTotal() {
    return (this.tarifaBase * this.horasEstacionado) + 5000;
  }
}