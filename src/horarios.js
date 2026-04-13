let horarios = [];

export function resetHorarios() {
  horarios = [];
}

export function crearHorario(ruta, dia, hora) {
  if (!ruta || !dia || !hora) {
    throw new Error("Datos incompletos");
  }

  const nuevo = { ruta, dia, hora };
  horarios.push(nuevo);
  return nuevo;
}