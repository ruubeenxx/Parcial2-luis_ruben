
const Controlador = {

  registrar() {
    let placa        = document.getElementById('placa').value.trim();
    let propietario  = document.getElementById('propietario').value.trim();
    let horas        = parseInt(document.getElementById('horas').value);
    let tipo         = document.getElementById('tipo').value;

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
    document.getElementById('campoPuertas').style.display    = (tipo === 'C') ? 'block' : 'none';
  },

  iniciar() {
    let lista = Modelo.cargar();
    Vista.renderizarTabla(lista);
    this.actualizarCampos();
  }

};


document.getElementById('tipo').addEventListener('change', function () {
  Controlador.actualizarCampos();
});


Controlador.iniciar();