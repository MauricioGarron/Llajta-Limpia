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

});