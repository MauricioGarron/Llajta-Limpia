let horarios = [];

export function resetHorarios() {
  horarios = [];
}

export function crearHorario(ruta, dia, hora) {
  if (!ruta || !dia || !hora) {
    throw new Error("Datos incompletos");
  }

  const existe = horarios.find(
    h => h.ruta === ruta && h.dia === dia && h.hora === hora
  );

  if (existe) {
    throw new Error("Horario duplicado");
  }

  const nuevo = { ruta, dia, hora };
  horarios.push(nuevo);

  return nuevo;
}

export function obtenerHorariosPorRuta(ruta) {
  return horarios.filter(h => h.ruta === ruta);
}

export function eliminarHorario(ruta, dia, hora) {
  horarios = horarios.filter(
    h => !(h.ruta === ruta && h.dia === dia && h.hora === hora)
  );
}