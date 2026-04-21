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

export function eliminarRuta(zona, ruta) {
  if (!zona || !ruta) {
    throw new Error("Datos incompletos");
  }

  rutas = rutas.filter(r => !(r.zona === zona && r.ruta === ruta));
}

export function obtenerZonas() {
  return [...new Set(rutas.map(r => r.zona))];
}

export function obtenerRutasPorZona(zona) {
   if (!zona || !zona.trim()) {
    throw new Error("Zona inválida");
  }

  const zonaLimpia = zona.trim().toLowerCase();
  
  return rutas.filter(r => r.zona.toLowerCase() === zonaLimpia);
}

export function editarRuta(zona, nombreViejo, nombreNuevo) {
  if (!nombreNuevo) {
    throw new Error("Datos incompletos");
  }
  const rutaEncontrada = rutas.find(r => r.zona === zona && r.ruta === nombreViejo);
  if (rutaEncontrada) {
    rutaEncontrada.ruta = nombreNuevo;
  }
}