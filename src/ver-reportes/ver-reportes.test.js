import { crearReporte, resetReportes } from "../crear-reporte/crear-reporte.js";
import { verReportes } from "./ver-reportes.js";
import { darLikeReporte } from "./ver-reportes.js";

describe("HU - Ver reportes", () => {
  beforeEach(() => {
    resetReportes();
  });

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
});