let reportes = [];

export function resetReportes() {
  reportes = [];
}

export function crearReporte(zona, direccion, descripcion) {
  if (!zona || !direccion || !descripcion) {
    throw new Error("Faltan datos obligatorios");
  }

  const reporte = {
    zona,
    direccion,
    descripcion,
    estado: "enviado",
    likes: 0
  };

  reportes.push(reporte);
  return reporte;
}

export function obtenerReportes() {
  return reportes;
}