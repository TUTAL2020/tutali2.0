module.exports = class Tendero {
    constructor(tendero){
        this.nombre = tendero.nombre;
        this.correo = tendero.correo;
        this.nombreTienda = tendero.nombreTienda;
        this.direccion = tendero.direccionTienda;
        this.usuario = tendero.usuario;
        this.contrasena = tendero.contrasena;
        this.confirmarContrasena = tendero.contrasenaR;
        this.rol = 1;
        this.productos = [];

  }

  getNombre(){
    return this.nombre;
  }

  setNombre(nombre){
    this.nombre = nombre;
  }

  getCorreo(){
    return this.correo;
  }

  setCorreo(correo){
    this.correo = correo;
  }

  getNombreTienda(){
    return this.NombreTienda;
  }

  setNombreTienda(nombreTienda){
    this.nombreTienda = nombreTienda;

  }

  getDireccion(){
    return this.direccion;
  }

  setDireccion(){
    this.direccion = direccion;
  }

  getUsuario(){
    return this.usuario;
  }

  setUsuario(usuario){
    this.usuario = usuario;
  }

  getContrasena(){
    return this.contrasena;
  }

  setContrasena(contrasena){
    this.contrasena = contrasena;
  }

  getConfirmarContrasena(){
    return this.confirmarContrasena;
  }

  setConfirmarContrasena(confirmarContrasena){
    this.confirmarContrasena =confirmarContrasena;
  }



}
