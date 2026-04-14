import {
  crearReporte,
  resetReportes
} from "./crearReporte.js";

describe("HU - Crear reporte de basura", () => {

  beforeEach(() => {
    resetReportes();
  });

  test("debería crear un reporte correctamente", () => {
    const reporte = crearReporte("Zona norte", "Basura acumulada");

    expect(reporte).toEqual({
      ubicacion: "Zona norte",
      descripcion: "Basura acumulada"
    });
  });

});