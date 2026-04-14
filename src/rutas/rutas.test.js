import {
  crearRuta,
  obtenerZonas,
  obtenerRutasPorZona,
  resetRutas
} from "./rutas.js";

describe("HU6 - Crear ruta por zona", () => {

  beforeEach(() => {
    resetRutas();
  });

  test("debería crear una ruta correctamente", () => {
    crearRuta("norte", "Av. América");

    const rutas = obtenerRutasPorZona("norte");

    expect(rutas.length).toBe(1);
    expect(rutas[0].ruta).toBe("Av. América");
  });

  test("debería lanzar error si faltan datos", () => {
    expect(() => crearRuta("", "Av. América")).toThrow();
    expect(() => crearRuta("norte", "")).toThrow();
  });

  test("debería devolver zonas únicas", () => {
    crearRuta("norte", "Ruta 1");
    crearRuta("norte", "Ruta 2");
    crearRuta("sur", "Ruta 3");

    const zonas = obtenerZonas();

    expect(zonas).toContain("norte");
    expect(zonas).toContain("sur");
    expect(zonas.length).toBe(2);
  });

  test("debería filtrar rutas por zona", () => {
    crearRuta("norte", "Ruta 1");
    crearRuta("sur", "Ruta 2");

    const rutas = obtenerRutasPorZona("norte");

    expect(rutas.length).toBe(1);
    expect(rutas[0].zona).toBe("norte");
  });

});