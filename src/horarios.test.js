import { crearHorario } from "./horarios.js";

describe("HU - Crear horarios", () => {

  test("debería crear un horario", () => {
    const resultado = crearHorario("Av. América", "Lunes", "08:00");

    expect(resultado).toEqual({
      ruta: "Av. América",
      dia: "Lunes",
      hora: "08:00"
    });
  });

});