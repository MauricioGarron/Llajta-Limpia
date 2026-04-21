import {
  crearHorario,
  obtenerHorariosPorZona,
  resetHorarios,
  eliminarHorario,
  obtenerHorariosPorRuta,
  editarHorario
} from "./horarios.js";

import {
  crearRuta,
  resetRutas
} from "./rutas.js";

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

});

describe("HU8 - Ver horarios por zona", () => {

  beforeEach(() => {
    resetHorarios();
    resetRutas();
  });

  test("debería obtener horarios de todas las rutas de una zona", () => {
    crearRuta("norte", "Ruta 1");
    crearRuta("norte", "Ruta 2");

    crearHorario("Ruta 1", "Lunes", "08:00");
    crearHorario("Ruta 2", "Martes", "09:00");

    const horarios = obtenerHorariosPorZona("norte");

    expect(horarios.length).toBe(2);
  });

  test("debería devolver vacío si la zona no existe", () => {
    const horarios = obtenerHorariosPorZona("sur");

    expect(horarios).toEqual([]);
  });

  test("debería borrar un horario existente de la lista", () => {
    crearHorario("Ruta 1", "Sábado", "18:00");
    eliminarHorario("Ruta 1", "Sábado", "18:00", true); 
    const lista = obtenerHorariosPorRuta("Ruta 1");
    expect(lista).toHaveLength(0);
  });

  test("no debería eliminar el horario si no se pasa la confirmación", () => {
    crearHorario("Ruta 1", "Sábado", "18:00");
    eliminarHorario("Ruta 1", "Sábado", "18:00", false); 
    const lista = obtenerHorariosPorRuta("Ruta 1");
    expect(lista).toHaveLength(1); 
  });

  test("debería editar la hora de un horario existente", () => {
    crearHorario("Ruta 1", "Lunes", "08:00");
    const viejo = { ruta: "Ruta 1", dia: "Lunes", hora: "08:00" };
    const nuevo = { ruta: "Ruta 1", dia: "Lunes", hora: "10:00" };
    editarHorario(viejo, nuevo);
    const lista = obtenerHorariosPorRuta("Ruta 1");
    expect(lista[0].hora).toBe("10:00");
  });

});
