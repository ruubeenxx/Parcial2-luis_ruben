
class Moto extends Vehiculo {
  constructor(placa, propietario, horasEstacionado, tarifaBase, cilindraje) {
    super(placa, propietario, horasEstacionado, tarifaBase, 'M');
    this.cilindraje = cilindraje;
  }

  calcularTarifaTotal() {
    return (this.tarifaBase * this.horasEstacionado) + 2000;
  }
}