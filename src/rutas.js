// Estado interno
let rutas = [];

// Reiniciar (para tests)
export function resetRutas() {
  rutas = [];
}

// Crear ruta
export function crearRuta(zona, ruta) {
  if (!zona || !ruta) {
    throw new Error("Datos incompletos");
  }

  rutas.push({ zona, ruta });
}

// Obtener zonas únicas
export function obtenerZonas() {
  return [...new Set(rutas.map(r => r.zona))];
}

// Obtener rutas por zona
export function obtenerRutasPorZona(zona) {
  return rutas.filter(r => r.zona === zona);
}