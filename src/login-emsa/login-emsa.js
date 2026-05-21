class LoginEMSAService {

  constructor() {

    this.usuarioCorrecto = "admin";

    this.passwordCorrecto = "123456";

  }

  iniciarSesion(usuario, password) {

    if (
      usuario === this.usuarioCorrecto &&
      password === this.passwordCorrecto
    ) {

      return {
        exito: true
      };

    }

    return {
      exito: false,
      mensaje: "Credenciales incorrectas"
    };

  }

}

export { LoginEMSAService };