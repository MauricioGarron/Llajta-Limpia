import { obtenerReportes } from "../crear-reporte/crear-reporte.js";

export class VerReportesPorZona {
  obtenerReportesPorZona(zona) {
    const zonaBuscada = zona.trim().toLowerCase();

    const reportes = obtenerReportes();

    const reportesFiltrados = reportes
      .filter(reporte => reporte.zona.trim().toLowerCase() === zonaBuscada)
      .map(reporte => ({
        zona: reporte.zona,
        descripcion: reporte.descripcion,
        estado: reporte.estado,
        ubicacion: reporte.direccion,
        fecha: reporte.fecha || "Sin fecha",
        likes: reporte.likes
      }));

    if (reportesFiltrados.length === 0) {
      return {
        mensaje: "No existen reportes en la zona seleccionada.",
        reportes: []
      };
    }

    return {
      mensaje: "",
      reportes: reportesFiltrados
    };
  }

  obtenerResumenPorZona() {
    const reportes = obtenerReportes();
    const resumen = {};

    reportes.forEach(reporte => {
      const zona = reporte.zona.trim().toLowerCase();

      if (!resumen[zona]) {
        resumen[zona] = {
          zona: reporte.zona,
          cantidad: 0
        };
      }

      resumen[zona].cantidad++;
    });

    return Object.values(resumen).sort((a, b) => b.cantidad - a.cantidad);
  }

  obtenerZonasConReportes() {
    const reportes = obtenerReportes();

    const zonas = reportes.map(reporte => reporte.zona);

    return [...new Set(zonas)];
  }
}