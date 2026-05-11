// ==================== MODELO (Clases) ====================

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

class Moto extends Vehiculo {
  constructor(placa, propietario, horasEstacionado, tarifaBase, cilindraje) {
    super(placa, propietario, horasEstacionado, tarifaBase, 'M');
    this.cilindraje = cilindraje;
  }

  calcularTarifaTotal() {
    return (this.tarifaBase * this.horasEstacionado) + 2000;
  }
}

class Carro extends Vehiculo {
  constructor(placa, propietario, horasEstacionado, tarifaBase, numeroPuertas) {
    super(placa, propietario, horasEstacionado, tarifaBase, 'C');
    this.numeroPuertas = numeroPuertas;
  }

  calcularTarifaTotal() {
    return (this.tarifaBase * this.horasEstacionado) + 5000;
  }
}


// ==================== MODELO DE DATOS (localStorage) ====================

const Modelo = {
  guardar(lista) {
    localStorage.setItem('vehiculos', JSON.stringify(lista));
  },

  cargar() {
    let datos = localStorage.getItem('vehiculos');
    if (!datos) return [];
    let arr = JSON.parse(datos);
    return arr.map(d => Vehiculo.crearVehiculo(d));
  }
};


// ==================== VISTA ====================

const Vista = {
  renderizarTabla(lista) {
    let tbody = document.getElementById('tablaVehiculos');
    tbody.innerHTML = '';

    for (let v of lista) {
      let fila = document.createElement('tr');
      let tipoTexto = { M: 'Moto', C: 'Carro', K: 'Camioneta', B: 'Bus' }[v.tipoVehiculo];
      fila.innerHTML = `
        <td>${v.placa}</td>
        <td>${v.propietario}</td>
        <td>${v.horasEstacionado}</td>
        <td>${tipoTexto}</td>
        <td>$${v.calcularTarifaTotal().toLocaleString()}</td>
      `;
      tbody.appendChild(fila);
    }

    let total = Vehiculo.hallarTotalDiario(lista);
    document.getElementById('totalDia').textContent = 'Total recaudado del día: $' + total.toLocaleString();
  },

  mostrarError(msg) {
    document.getElementById('mensajeError').textContent = msg;
  },

  limpiarFormulario() {
    document.getElementById('placa').value = '';
    document.getElementById('propietario').value = '';
    document.getElementById('horas').value = '';
    document.getElementById('tipo').value = 'M';
    document.getElementById('cilindraje').value = '';
    document.getElementById('puertas').value = '';
    document.getElementById('mensajeError').textContent = '';
    Controlador.actualizarCampos();
  }
};


// ==================== CONTROLADOR ====================

const Controlador = {
  registrar() {
    let placa = document.getElementById('placa').value.trim();
    let propietario = document.getElementById('propietario').value.trim();
    let horas = parseInt(document.getElementById('horas').value);
    let tipo = document.getElementById('tipo').value;

    if (!placa || !propietario || isNaN(horas) || horas < 1) {
      Vista.mostrarError('Por favor completa todos los campos correctamente.');
      return;
    }

    let tarifaBase = 1000;
    let vehiculo;

    if (tipo === 'M') {
      let cilindraje = parseInt(document.getElementById('cilindraje').value);
      if (isNaN(cilindraje) || cilindraje < 1) {
        Vista.mostrarError('Ingresa el cilindraje de la moto.');
        return;
      }
      vehiculo = new Moto(placa, propietario, horas, tarifaBase, cilindraje);

    } else if (tipo === 'C') {
      let puertas = parseInt(document.getElementById('puertas').value);
      if (isNaN(puertas) || puertas < 1) {
        Vista.mostrarError('Ingresa el número de puertas del carro.');
        return;
      }
      vehiculo = new Carro(placa, propietario, horas, tarifaBase, puertas);

    } else {
      vehiculo = new Vehiculo(placa, propietario, horas, tarifaBase, tipo);
    }

    let lista = Modelo.cargar();
    lista.push(vehiculo);
    Modelo.guardar(lista);

    Vista.renderizarTabla(lista);
    Vista.limpiarFormulario();
  },

  actualizarCampos() {
    let tipo = document.getElementById('tipo').value;
    document.getElementById('campoCilindraje').style.display = (tipo === 'M') ? 'block' : 'none';
    document.getElementById('campoPuertas').style.display = (tipo === 'C') ? 'block' : 'none';
  },

  iniciar() {
    let lista = Modelo.cargar();
    Vista.renderizarTabla(lista);
    this.actualizarCampos();
  }
};

// Escuchar cambio de tipo de vehículo
document.getElementById('tipo').addEventListener('change', function () {
  Controlador.actualizarCampos();
});

// Arrancar la app
Controlador.iniciar();