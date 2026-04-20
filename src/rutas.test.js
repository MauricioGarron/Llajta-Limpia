import {
  crearRuta,
  eliminarRuta,
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

  
  test("debería eliminar una ruta", () => {
    crearRuta("norte", "Av. América");

    eliminarRuta("norte", "Av. América");

    const rutas = obtenerRutasPorZona("norte");

    expect(rutas.length).toBe(0);
  });

});

describe("HU7 - Ver ruta por zona", () => {

  beforeEach(() => {
    resetRutas();
  });

  test("debería devolver rutas de una zona existente", () => {
    crearRuta("norte", "Ruta 1");

    const rutas = obtenerRutasPorZona("norte");

    expect(rutas.length).toBe(1);
  });

  test("debería lanzar error si la zona es inválida", () => {
    expect(() => obtenerRutasPorZona("   ")).toThrow();
  });

  test("debería ignorar mayúsculas/minúsculas en la zona", () => {
    crearRuta("Norte", "Ruta 1");

    const rutas = obtenerRutasPorZona("norte");

    expect(rutas.length).toBe(1);
  });

  test("debería ignorar espacios en la zona al buscar", () => {
    crearRuta("norte", "Ruta 1");

    const rutas = obtenerRutasPorZona(" norte ");

    expect(rutas.length).toBe(1);
  });

});