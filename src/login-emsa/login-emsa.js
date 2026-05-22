class LoginEMSAService {

  constructor() {

    this.usuarioCorrecto = "admin";

    this.passwordCorrecto = "123456";

    this.intentosFallidos = 0;

    this.bloqueado = false;

  }

  iniciarSesion(usuario, password) {

    if (this.bloqueado) {

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

      return {
        exito: true
      };

    }

    this.intentosFallidos++;

    if (this.intentosFallidos >= 3) {

      this.bloqueado = true;

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