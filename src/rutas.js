let rutas = [];

export function resetRutas() {
  rutas = [];
}

export function crearRuta(zona, ruta) {
  if (!zona || !ruta) {
    throw new Error("Datos incompletos");
  }

  rutas.push({ zona, ruta });
}

// 🔥 implementación mínima
export function eliminarRuta(zona, ruta) {
  rutas = rutas.filter(r => !(r.zona === zona && r.ruta === ruta));
}

export function obtenerZonas() {
  return [...new Set(rutas.map(r => r.zona))];
}

export function obtenerRutasPorZona(zona) {
  return rutas.filter(r => r.zona === zona);
}