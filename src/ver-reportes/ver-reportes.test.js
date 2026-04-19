import { crearReporte, resetReportes } from "../crear-reporte/crear-reporte.js";
import { verReportes } from "./ver-reportes.js";

describe("HU - Ver reportes", () => {
  beforeEach(() => {
    resetReportes();
  });

  test("debería mostrar una lista de reportes existentes", () => {
    crearReporte("norte", "Av. América", "Basura en la esquina");
    crearReporte("sur", "Av. Panamericana", "Contenedor lleno");

    const reportes = verReportes();

    expect(reportes.length).toBe(2);
    expect(reportes[0].zona).toBe("norte");
    expect(reportes[1].zona).toBe("sur");
  });
});