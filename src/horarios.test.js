import {
  crearHorario,
  obtenerHorariosPorZona,
  resetHorarios,
  eliminarHorario,
  obtenerHorariosPorRuta,
  editarHorario,
  asignarHorario,
  obtenerProgramacion,
  obtenerRutasDisponibles,
  enlazarRutaHorario,
  obtenerRutasProgramadas
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

  test("debería lanzar error si el nuevo horario tiene campos vacíos", () => {
    crearHorario("Ruta 1", "Lunes", "08:00");
    const viejo = { ruta: "Ruta 1", dia: "Lunes", hora: "08:00" };
    const nuevo = { ruta: "Ruta 1", dia: "", hora: "" };

    expect(() => editarHorario(viejo, nuevo)).toThrow("Datos incompletos");
  });


  test("no debería aumentar el número total de horarios al editar", () => {
    crearHorario("Ruta 1", "Lunes", "08:00");
    const viejo = { ruta: "Ruta 1", dia: "Lunes", hora: "08:00" };
    const nuevo = { ruta: "Ruta 1", dia: "Martes", hora: "09:00" };

    editarHorario(viejo, nuevo);

    const lista = obtenerHorariosPorRuta("Ruta 1");
    expect(lista).toHaveLength(1);
  });
});

describe("SP2-05 - Asignar horarios", () => {
  beforeEach(() => {
    resetHorarios();
    resetRutas();
  });

  test("cuando EMSA selecciona una ruta y un horario válido, el sistema guarda la asignación correctamente", () => {
    crearRuta("norte", "Ruta 1");

    const resultado = asignarHorario("Ruta 1", "Lunes", "08:00");

    expect(resultado.mensaje).toBe("Horario asignado correctamente.");
    expect(resultado.horario.ruta).toBe("Ruta 1");
    expect(resultado.horario.dia).toBe("Lunes");
    expect(resultado.horario.hora).toBe("08:00");
  });

  test("si faltan datos obligatorios, el sistema muestra un mensaje solicitando completar la información", () => {
    crearRuta("norte", "Ruta 1");

    const resultado = asignarHorario("", "Lunes", "08:00");

    expect(resultado.mensaje).toBe("Completa todos los datos obligatorios.");
    expect(resultado.horario).toBeNull();
  });

  test("si el horario seleccionado ya está ocupado, el sistema muestra una alerta", () => {
    crearRuta("norte", "Ruta 1");

    asignarHorario("Ruta 1", "Lunes", "08:00");

    const resultado = asignarHorario("Ruta 1", "Lunes", "08:00");

    expect(resultado.mensaje).toBe("El horario seleccionado ya está ocupado.");
    expect(resultado.horario).toBeNull();
  });

  test("el horario asignado aparece en la lista de programación", () => {
    crearRuta("norte", "Ruta 1");

    asignarHorario("Ruta 1", "Lunes", "08:00");

    const programacion = obtenerProgramacion();

    expect(programacion.length).toBe(1);
    expect(programacion[0].ruta).toBe("Ruta 1");
    expect(programacion[0].dia).toBe("Lunes");
    expect(programacion[0].hora).toBe("08:00");
  });

  test("EMSA puede visualizar la ruta con su horario correspondiente", () => {
    crearRuta("norte", "Ruta 1");

    asignarHorario("Ruta 1", "Lunes", "08:00");

    const horarios = obtenerHorariosPorRuta("Ruta 1");

    expect(horarios.length).toBe(1);
    expect(horarios[0].ruta).toBe("Ruta 1");
    expect(horarios[0].dia).toBe("Lunes");
    expect(horarios[0].hora).toBe("08:00");
  });

  test("EMSA puede visualizar las rutas disponibles para asignar horarios", () => {
    crearRuta("norte", "Ruta 1");
    crearRuta("sur", "Ruta 2");

    const rutasDisponibles = obtenerRutasDisponibles();

    expect(rutasDisponibles.length).toBe(2);
    expect(rutasDisponibles[0].ruta).toBe("Ruta 1");
    expect(rutasDisponibles[1].ruta).toBe("Ruta 2");
  });
});

describe("SP2-04 - Enlazar rutas y horarios", () => {
  beforeEach(() => {
    resetHorarios();
    resetRutas();
  });

  test("cuando EMSA selecciona una ruta y un horario válidos, el sistema guarda el enlace correctamente", () => {
    crearRuta("norte", "Ruta 1");

    const resultado = enlazarRutaHorario("Ruta 1", "Lunes", "08:00");

    expect(resultado.mensaje).toBe("Ruta y horario enlazados correctamente.");
    expect(resultado.enlace.ruta).toBe("Ruta 1");
    expect(resultado.enlace.dia).toBe("Lunes");
    expect(resultado.enlace.hora).toBe("08:00");
  });

  test("la ruta enlazada aparece en la lista de rutas programadas", () => {
    crearRuta("norte", "Ruta 1");

    enlazarRutaHorario("Ruta 1", "Lunes", "08:00");

    const rutasProgramadas = obtenerRutasProgramadas();

    expect(rutasProgramadas.length).toBe(1);
    expect(rutasProgramadas[0].ruta).toBe("Ruta 1");
    expect(rutasProgramadas[0].dia).toBe("Lunes");
    expect(rutasProgramadas[0].hora).toBe("08:00");
  });

  test("si una ruta ya tiene un horario asignado en el mismo rango, el sistema muestra un mensaje de conflicto", () => {
    crearRuta("norte", "Ruta 1");

    enlazarRutaHorario("Ruta 1", "Lunes", "08:00");

    const resultado = enlazarRutaHorario("Ruta 1", "Lunes", "08:00");

    expect(resultado.mensaje).toBe("La ruta ya tiene un horario asignado en el mismo rango.");
    expect(resultado.enlace).toBeNull();
  });

  test("si faltan datos obligatorios, el sistema solicita completarlos antes de guardar", () => {
    crearRuta("norte", "Ruta 1");

    const resultado = enlazarRutaHorario("", "Lunes", "08:00");

    expect(resultado.mensaje).toBe("Completa los datos obligatorios antes de guardar.");
    expect(resultado.enlace).toBeNull();
  });

  test("los cambios realizados se reflejan inmediatamente en el sistema", () => {
    crearRuta("norte", "Ruta 1");

    enlazarRutaHorario("Ruta 1", "Lunes", "08:00");

    const horariosRuta = obtenerHorariosPorRuta("Ruta 1");

    expect(horariosRuta.length).toBe(1);
    expect(horariosRuta[0].ruta).toBe("Ruta 1");
    expect(horariosRuta[0].dia).toBe("Lunes");
    expect(horariosRuta[0].hora).toBe("08:00");
  });

  test("no debería enlazar una ruta que no existe", () => {
    const resultado = enlazarRutaHorario("Ruta inexistente", "Lunes", "08:00");

    expect(resultado.mensaje).toBe("La ruta seleccionada no está disponible.");
    expect(resultado.enlace).toBeNull();
  });
});
