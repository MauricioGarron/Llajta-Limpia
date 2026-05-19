import {
  crearReporte,
  resetReportes
} from "../crear-reporte/crear-reporte.js";

import {
  VerReportesPorZona
} from "./verReportesPorZona.js";

describe("HU - Ver reportes por zona", () => {
  let verReportesPorZona;

  beforeEach(() => {
    resetReportes();
    verReportesPorZona = new VerReportesPorZona();
  });

  test("EMSA puede seleccionar una zona para visualizar sus reportes", () => {
    crearReporte("norte", "Av. América", "Basura acumulada");
    crearReporte("sur", "Av. Panamericana", "Contenedor lleno");

    const resultado = verReportesPorZona.obtenerReportesPorZona("norte");

    expect(resultado.reportes.length).toBe(1);
    expect(resultado.reportes[0].zona).toBe("norte");
  });

  test("el sistema muestra únicamente los reportes correspondientes a la zona seleccionada", () => {
    crearReporte("norte", "Av. América", "Basura acumulada");
    crearReporte("norte", "Calle Sucre", "Bolsas acumuladas");
    crearReporte("sur", "Av. Panamericana", "Contenedor lleno");

    const resultado = verReportesPorZona.obtenerReportesPorZona("norte");

    expect(resultado.reportes.length).toBe(2);
    expect(resultado.reportes.every(reporte => reporte.zona === "norte")).toBe(true);
  });

  test("si no existen reportes en la zona, el sistema muestra un mensaje informativo", () => {
    crearReporte("norte", "Av. América", "Basura acumulada");

    const resultado = verReportesPorZona.obtenerReportesPorZona("sur");

    expect(resultado.mensaje).toBe("No existen reportes en la zona seleccionada.");
    expect(resultado.reportes).toEqual([]);
  });

  test("los reportes visualizados incluyen estado, ubicación y fecha", () => {
    crearReporte("norte", "Av. América", "Basura acumulada");

    const resultado = verReportesPorZona.obtenerReportesPorZona("norte");
    const reporte = resultado.reportes[0];

    expect(reporte.estado).toBe("enviado");
    expect(reporte.ubicacion).toBe("Av. América");
    expect(reporte.fecha).toBe("Sin fecha");
  });

  test("EMSA puede cambiar de zona y actualizar la visualización de reportes", () => {
    crearReporte("norte", "Av. América", "Basura acumulada");
    crearReporte("sur", "Av. Panamericana", "Contenedor lleno");

    const resultadoNorte = verReportesPorZona.obtenerReportesPorZona("norte");
    const resultadoSur = verReportesPorZona.obtenerReportesPorZona("sur");

    expect(resultadoNorte.reportes.length).toBe(1);
    expect(resultadoNorte.reportes[0].zona).toBe("norte");

    expect(resultadoSur.reportes.length).toBe(1);
    expect(resultadoSur.reportes[0].zona).toBe("sur");
  });

  test("debería obtener un resumen con la cantidad de incidencias por zona", () => {
    crearReporte("norte", "Av. América", "Basura acumulada");
    crearReporte("norte", "Calle Sucre", "Bolsas acumuladas");
    crearReporte("sur", "Av. Panamericana", "Contenedor lleno");

    const resumen = verReportesPorZona.obtenerResumenPorZona();

    expect(resumen[0].zona).toBe("norte");
    expect(resumen[0].cantidad).toBe(2);

    expect(resumen[1].zona).toBe("sur");
    expect(resumen[1].cantidad).toBe(1);
  });
});