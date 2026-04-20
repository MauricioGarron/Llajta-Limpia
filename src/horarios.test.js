import {
  crearHorario,
  resetHorarios,
  obtenerHorariosPorRuta,
  eliminarHorario
} from "./horarios.js";

describe("HU - Crear horarios", () => {

  beforeEach(() => {
    resetHorarios();
  });

  test("no debería permitir horarios duplicados", () => {
    crearHorario("Av. América", "Lunes", "08:00");

    expect(() =>
      crearHorario("Av. América", "Lunes", "08:00")
    ).toThrow();
  });

  test("debería eliminar un horario si se confirma la acción", () => {
    crearHorario("Av. Heroínas", "Miércoles", "09:00");
    eliminarHorario("Av. Heroínas", "Miércoles", "09:00", true);
    const lista = obtenerHorariosPorRuta("Av. Heroínas");
    expect(lista).toHaveLength(0);
  });

});