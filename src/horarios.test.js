import {
  crearHorario,
  resetHorarios
} from "./horarios.js";

describe("HU - Crear horarios", () => {

  beforeEach(() => {
    resetHorarios();
  });

  test("debería lanzar error si faltan datos", () => {
    expect(() => crearHorario("", "Lunes", "08:00")).toThrow();
    expect(() => crearHorario("Av. América", "", "08:00")).toThrow();
    expect(() => crearHorario("Av. América", "Lunes", "")).toThrow();
  });

});