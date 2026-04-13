let horarios = [];

export function resetHorarios() {
  horarios = [];
}

export function crearHorario(ruta, dia, hora) {
  const nuevo = { ruta, dia, hora };
  horarios.push(nuevo);
  return nuevo;
}

export function obtenerHorariosPorRuta(ruta) {
  return horarios.filter(h => h.ruta === ruta);
}