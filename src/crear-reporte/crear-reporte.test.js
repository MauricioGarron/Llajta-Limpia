import { crearReporte } from "./crear-reporte.js";

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
});