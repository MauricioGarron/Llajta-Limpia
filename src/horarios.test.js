import {
  crearHorario,
  resetHorarios,
  eliminarHorario,
  obtenerHorariosPorRuta
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

  test("debería borrar un horario existente de la lista", () => {
    crearHorario("Zona Sud", "Lunes", "07:00");
    eliminarHorario("Zona Sud", "Lunes", "07:00",true);
    const resultados = obtenerHorariosPorRuta("Zona Sud");
    expect(resultados).toHaveLength(0);
  });

  test("no debería eliminar el horario si no se pasa la confirmación", () => {
    crearHorario("Zona Norte", "Sábado", "18:00");
    eliminarHorario("Zona Norte", "Sábado", "18:00", false);
    const lista = obtenerHorariosPorRuta("Zona Norte");
    expect(lista).toHaveLength(1); 
  });

});