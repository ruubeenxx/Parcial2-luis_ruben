
class Vehiculo {
  constructor(placa, propietario, horasEstacionado, tarifaBase, tipoVehiculo) {
    this.placa = placa;
    this.propietario = propietario;
    this.horasEstacionado = horasEstacionado;
    this.tarifaBase = tarifaBase;
    this.tipoVehiculo = tipoVehiculo;
  }

  
  calcularTarifaTotal() {
    let recargo = 0;
    if (this.tipoVehiculo === 'M') recargo = 2000;
    else if (this.tipoVehiculo === 'C') recargo = 5000;
    else if (this.tipoVehiculo === 'K') recargo = 8000;
    else if (this.tipoVehiculo === 'B') recargo = 15000;
    return (this.tarifaBase * this.horasEstacionado) + recargo;
  }

  static hallarTotalDiario(lista) {
    let total = 0;
    for (let v of lista) {
      total += v.calcularTarifaTotal();
    }
    return total;
  }

  static crearVehiculo(datos) {
    if (datos.tipoVehiculo === 'M') {
      return new Moto(datos.placa, datos.propietario, datos.horasEstacionado, datos.tarifaBase, datos.cilindraje);
    } else if (datos.tipoVehiculo === 'C') {
      return new Carro(datos.placa, datos.propietario, datos.horasEstacionado, datos.tarifaBase, datos.numeroPuertas);
    } else {
      return new Vehiculo(datos.placa, datos.propietario, datos.horasEstacionado, datos.tarifaBase, datos.tipoVehiculo);
    }
  }
}