import { crearReporte } from "./crear-reporte.js";
import { obtenerReportes, resetReportes } from "./crear-reporte.js";

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
    expect(reporte.estado).toBe("enviado");
  });
  test("debería pedir completar la información si faltan datos", () => {
  expect(() => crearReporte("", "Av. América", "Basura")).toThrow();
  expect(() => crearReporte("norte", "", "Basura")).toThrow();
  expect(() => crearReporte("norte", "Av. América", "")).toThrow();
});
test("debería guardar el reporte enviado", () => {
  crearReporte(
    "sur",
    "Av. Panamericana",
    "Contenedor lleno"
  );

  const reportes = obtenerReportes();

  expect(reportes.length).toBe(1);
  expect(reportes[0].zona).toBe("sur");
});
});
