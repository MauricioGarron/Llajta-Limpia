export function crearReporte(zona, direccion, descripcion) {
  return {
    zona,
    direccion,
    descripcion,
    estado: "enviado"
  };
}