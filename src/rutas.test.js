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