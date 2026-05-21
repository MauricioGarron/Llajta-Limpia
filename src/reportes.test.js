import {
  crearReporte,
  obtenerReportes,
  resetReportes,
  verReportes,
  darLikeReporte,
  VerReportesPorZona,
  cambiarEstadoReporte
} from "./reportes.js";

beforeEach(() => {
  resetReportes();
});

describe("HU - Crear reporte de basura", () => {
  test("debería enviar el reporte cuando el formulario está completo", () => {
    const reporte = crearReporte(
      "norte",
      "Av. América y Beijing",
      "Basura acumulada"
    );

    expect(reporte.zona).toBe("norte");
    expect(reporte.direccion).toBe("Av. América y Beijing");
    expect(reporte.descripcion).toBe("Basura acumulada");
    expect(reporte.estado).toBe("pendiente");
  });

  test("debería pedir completar la información si faltan datos", () => {
    expect(() => crearReporte("", "Av. América", "Basura")).toThrow();
    expect(() => crearReporte("norte", "", "Basura")).toThrow();
    expect(() => crearReporte("norte", "Av. América", "")).toThrow();
  });

  test("debería guardar el reporte enviado", () => {
    crearReporte("sur", "Av. Panamericana", "Contenedor lleno");

    const reportes = obtenerReportes();

    expect(reportes.length).toBe(1);
    expect(reportes[0].zona).toBe("sur");
  });
});

describe("HU - Ver reportes", () => {
  test("debería mostrar una lista de reportes existentes", () => {
    crearReporte("norte", "Av. América", "Basura en la esquina");
    crearReporte("sur", "Av. Panamericana", "Contenedor lleno");

    const resultado = verReportes();

    expect(resultado.reportes.length).toBe(2);
    expect(resultado.reportes[0].zona).toBe("norte");
    expect(resultado.reportes[1].zona).toBe("sur");
  });

  test("debería mostrar mensaje informativo si no hay reportes", () => {
    const resultado = verReportes();

    expect(resultado.mensaje).toBe("No hay reportes registrados.");
    expect(resultado.reportes.length).toBe(0);
  });

  test("cada reporte debería mostrar información básica", () => {
    crearReporte("norte", "Av. América", "Basura en la esquina");

    const resultado = verReportes();
    const reporte = resultado.reportes[0];

    expect(reporte.zona).toBe("norte");
    expect(reporte.direccion).toBe("Av. América");
    expect(reporte.descripcion).toBe("Basura en la esquina");
  });

  test('debería permitir dar "like" a un reporte', () => {
    crearReporte("norte", "Av. América", "Basura en la esquina");

    darLikeReporte(0);

    const resultado = verReportes();

    expect(resultado.reportes[0].likes).toBe(1);
  });

  test('debería visualizar la cantidad de "likes" de un reporte', () => {
    crearReporte("norte", "Av. América", "Basura en la esquina");

    darLikeReporte(0);
    darLikeReporte(0);

    const resultado = verReportes();

    expect(resultado.reportes[0].likes).toBe(2);
  });
});

describe("HU - Ver reportes por zona", () => {
  test("debería filtrar reportes por zona", () => {
    crearReporte("norte", "Av. América", "Basura en la esquina");
    crearReporte("sur", "Av. Panamericana", "Contenedor lleno");

    const servicio = new VerReportesPorZona();
    const resultado = servicio.obtenerReportesPorZona("norte");

    expect(resultado.reportes.length).toBe(1);
    expect(resultado.reportes[0].zona).toBe("norte");
  });

  test("debería mostrar mensaje si no se selecciona zona", () => {
    const servicio = new VerReportesPorZona();
    const resultado = servicio.obtenerReportesPorZona("");

    expect(resultado.mensaje).toBe("Selecciona una zona.");
    expect(resultado.reportes.length).toBe(0);
  });

  test("debería mostrar mensaje si no hay reportes en la zona", () => {
    crearReporte("norte", "Av. América", "Basura en la esquina");

    const servicio = new VerReportesPorZona();
    const resultado = servicio.obtenerReportesPorZona("sur");

    expect(resultado.mensaje).toBe(
      "No existen reportes en la zona seleccionada."
    );

    expect(resultado.reportes.length).toBe(0);
  });

  test("debería obtener zonas con reportes", () => {
    crearReporte("norte", "Av. América", "Basura");
    crearReporte("sur", "Av. Panamericana", "Contenedor lleno");

    const servicio = new VerReportesPorZona();
    const zonas = servicio.obtenerZonasConReportes();

    expect(zonas).toContain("norte");
    expect(zonas).toContain("sur");
  });

  test("debería obtener resumen por zona", () => {
    crearReporte("norte", "Av. América", "Basura");
    crearReporte("norte", "Av. Beijing", "Escombros");
    crearReporte("sur", "Av. Panamericana", "Contenedor lleno");

    const servicio = new VerReportesPorZona();
    const resumen = servicio.obtenerResumenPorZona();

    expect(resumen[0].zona).toBe("norte");
    expect(resumen[0].cantidad).toBe(2);
  });
});
describe("SP2-06 - Cambiar estado de reporte", () => {
  test("EMSA puede seleccionar un reporte y cambiar su estado", () => {
    crearReporte("norte", "Av. América", "Basura acumulada");

    const resultado = cambiarEstadoReporte(0, "resuelto");

    expect(resultado.mensaje).toBe("Estado actualizado correctamente.");
    expect(resultado.reporte.estado).toBe("resuelto");
  });

  test("cuando el estado se actualiza, el sistema guarda el cambio correctamente", () => {
    crearReporte("norte", "Av. América", "Basura acumulada");

    cambiarEstadoReporte(0, "resuelto");

    const reportes = obtenerReportes();

    expect(reportes[0].estado).toBe("resuelto");
  });

  test("el nuevo estado se refleja inmediatamente en la lista de reportes", () => {
    crearReporte("sur", "Av. Panamericana", "Contenedor lleno");

    cambiarEstadoReporte(0, "resuelto");

    const resultado = verReportes();

    expect(resultado.reportes[0].estado).toBe("resuelto");
  });

  test("si ocurre un error al actualizar, el sistema muestra un mensaje informativo", () => {
    crearReporte("norte", "Av. América", "Basura acumulada");

    const resultado = cambiarEstadoReporte(10, "resuelto");

    expect(resultado.mensaje).toBe("No se pudo actualizar el estado del reporte.");
    expect(resultado.reporte).toBeNull();
  });

  test("el sistema permite identificar visualmente si un reporte está pendiente o resuelto", () => {
    crearReporte("norte", "Av. América", "Basura acumulada");

    const resultado = cambiarEstadoReporte(0, "resuelto");

    expect(resultado.reporte.estado).toBe("resuelto");
    expect(resultado.reporte.obtenerClaseEstado()).toBe("estado-resuelto");
  });

  test("no debería permitir un estado inválido", () => {
    crearReporte("norte", "Av. América", "Basura acumulada");

    const resultado = cambiarEstadoReporte(0, "cancelado");

    expect(resultado.mensaje).toBe("Estado inválido.");
    expect(resultado.reporte).toBeNull();
  });
//
  test("verTodos ordena reportes por likes de mayor a menor", () => {
  crearReporte("norte", "Av. América", "Basura");
  crearReporte("sur", "Av. Panamericana", "Contenedor");

  darLikeReporte(1);
  darLikeReporte(1); 
  darLikeReporte(0); 
  const resultado = verReportes();

  expect(resultado.reportes[0].zona).toBe("sur");
  expect(resultado.reportes[1].zona).toBe("norte");
  });

  test("obtenerPorZona ordena reportes por likes de mayor a menor", () => {
  crearReporte("norte", "Av. América", "Basura");
  crearReporte("norte", "Av. Beijing", "Escombros");

  darLikeReporte(1); 

  const servicio = new VerReportesPorZona();
  const resultado = servicio.obtenerReportesPorZona("norte");

  expect(resultado.reportes[0].ubicacion).toBe("Av. Beijing");
  }); 
//  
  describe("SP2-07 - Validar formulario de reporte", () => {

    beforeEach(() => resetReportes());

    test("zona con solo espacios lanza error específico", () => {
      expect(() => crearReporte("   ", "Av. América", "Basura acumulada en la esquina"))
        .toThrow("La zona es obligatoria.");
    });

    test("dirección con solo espacios lanza error específico", () => {
      expect(() => crearReporte("norte", "   ", "Basura acumulada en la esquina"))
        .toThrow("La dirección es obligatoria.");
    });

  });
});