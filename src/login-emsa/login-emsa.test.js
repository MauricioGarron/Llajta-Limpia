import { LoginEMSAService } from "./login-emsa";

describe("Login EMSA", () => {

  let loginService;

  beforeEach(() => {

    loginService = new LoginEMSAService();

  });

  test("usuario accede con credenciales correctas", () => {

    const resultado = loginService.iniciarSesion(
      "admin",
      "123456"
    );

    expect(resultado.exito).toBe(true);

  });

  test("muestra error si las credenciales son incorrectas", () => {

    const resultado = loginService.iniciarSesion(
      "admin",
      "999999"
    );

    expect(resultado.exito).toBe(false);

    expect(resultado.mensaje).toBe(
      "Credenciales incorrectas"
    );

  });

});