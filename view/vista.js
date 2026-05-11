
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