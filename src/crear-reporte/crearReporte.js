let reportes = [];

export function resetReportes() {
  reportes = [];
}

export function crearReporte(ubicacion, descripcion) {
  if (!ubicacion || !descripcion) {
    throw new Error("Datos incompletos");
  }

  const nuevo = { ubicacion, descripcion };
  reportes.push(nuevo);

  return nuevo;
}