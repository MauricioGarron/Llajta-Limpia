class LoginEMSAService {

  constructor() {

    this.usuarioCorrecto = "admin";
    this.passwordCorrecto = "123456";

    this.intentosFallidos = 0;

    this.bloqueadoHasta = null;

  }

  iniciarSesion(usuario, password) {

    const ahora = Date.now();

    if (
      this.bloqueadoHasta &&
      ahora < this.bloqueadoHasta
    ) {

      return {
        exito: false,
        mensaje: "Usuario bloqueado temporalmente"
      };

    }

    if (!usuario || !password) {

      return {
        exito: false,
        mensaje: "Complete todos los campos"
      };

    }

    if (
      usuario === this.usuarioCorrecto &&
      password === this.passwordCorrecto
    ) {

      this.intentosFallidos = 0;

      this.bloqueadoHasta = null;

      return {
        exito: true
      };

    }

    this.intentosFallidos++;

    if (this.intentosFallidos >= 3) {

      this.bloqueadoHasta = Date.now() + 30000;

      return {
        exito: false,
        mensaje: "Usuario bloqueado temporalmente"
      };

    }

    return {
      exito: false,
      mensaje: "Credenciales incorrectas"
    };

  }

}

export { LoginEMSAService };