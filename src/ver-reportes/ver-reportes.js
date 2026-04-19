import { obtenerReportes } from "../crear-reporte/crear-reporte.js";

export function verReportes() {
  const reportes = obtenerReportes();

  if (reportes.length === 0) {
    return {
      mensaje: "No hay reportes registrados.",
      reportes: []
    };
  }

  return {
    mensaje: "",
    reportes: reportes
  };
}