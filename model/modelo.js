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