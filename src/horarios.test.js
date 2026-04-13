import {
  crearHorario,
  obtenerHorariosPorRuta,
  resetHorarios
} from "./horarios.js";

describe("HU - Crear horarios", () => {

  beforeEach(() => {
    resetHorarios();
  });

  test("debería guardar el horario", () => {
    crearHorario("Av. América", "Lunes", "08:00");

    const horarios = obtenerHorariosPorRuta("Av. América");

    expect(horarios.length).toBe(1);
  });

});