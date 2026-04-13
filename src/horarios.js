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