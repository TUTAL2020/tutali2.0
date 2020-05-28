
module.exports = class Cliente{



    constructor(cliente){
      this.nombre = cliente.nombre;
      this.correo = cliente.correo;
      this.usuario = cliente.usuario;
      this.contrasena = cliente.contrasena;
      this.confirmarContrasena = cliente.contrasenaR;
      this.rol = 0;

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
