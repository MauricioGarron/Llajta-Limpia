export function crearReporte(zona, direccion, descripcion) {
  if (!zona || !direccion || !descripcion) {
    throw new Error("Faltan datos obligatorios");
  }

  return {
    zona,
    direccion,
    descripcion,
    estado: "enviado"
  };
}