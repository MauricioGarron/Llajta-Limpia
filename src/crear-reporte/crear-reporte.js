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
    estado: "enviado"
  };

  reportes.push(reporte);
  return reporte;
}

export function obtenerReportes() {
  return reportes;
}