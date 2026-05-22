import { recuperarPassword } from "../recover-password";

describe("Recuperar contraseña", () => {

  let usuarios;

  beforeEach(() => {

    usuarios = [
      {
        nombre: "Alex",
        correo: "alex@gmail.com",
        password: "123456"
      }
    ];

  });

  test("encuentra usuario por correo", () => {

    const resultado =
      recuperarPassword(
        usuarios,
        "alex@gmail.com"
      );

    expect(resultado.exito)
      .toBe(true);

  });
  test("falla si correo no existe", () => {

  const resultado =
    recuperarPassword(
      usuarios,
      "noexiste@gmail.com"
    );

  expect(resultado.exito)
    .toBe(false);

  expect(resultado.mensaje)
    .toBe(
      "Correo no encontrado"
    );

});
test("actualiza password correctamente", () => {

  recuperarPassword(
    usuarios,
    "alex@gmail.com",
    "nueva123"
  );

  expect(
    usuarios[0].password
  ).toBe("nueva123");

});
});