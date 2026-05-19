import { obtenerReportes } from "../crear-reporte/crear-reporte.js";

const MENSAJE_SIN_ZONA = "Selecciona una zona.";
const MENSAJE_SIN_REPORTES = "No existen reportes en la zona seleccionada.";
const FECHA_NO_REGISTRADA = "Sin fecha";

export class VerReportesPorZona {
  constructor(obtenerReportesFuncion = obtenerReportes) {
    this.obtenerReportes = obtenerReportesFuncion;
  }

  obtenerReportesPorZona(zona) {
    const zonaBuscada = this.normalizarTexto(zona);

    if (!zonaBuscada) {
      return this.crearRespuesta(MENSAJE_SIN_ZONA, []);
    }

    const reportesFiltrados = this.obtenerReportes()
      .filter(reporte => this.perteneceAZona(reporte, zonaBuscada))
      .map(reporte => this.formatearReporte(reporte));

    if (reportesFiltrados.length === 0) {
      return this.crearRespuesta(MENSAJE_SIN_REPORTES, []);
    }

    return this.crearRespuesta("", reportesFiltrados);
  }

  obtenerZonasConReportes() {
    const zonas = new Map();

    this.obtenerReportes().forEach(reporte => {
      const zonaNormalizada = this.normalizarTexto(reporte.zona);

      if (zonaNormalizada) {
        zonas.set(zonaNormalizada, reporte.zona);
      }
    });

    return Array.from(zonas.values());
  }

  obtenerResumenPorZona() {
    const resumen = {};

    this.obtenerReportes().forEach(reporte => {
      const zonaNormalizada = this.normalizarTexto(reporte.zona);

      if (!zonaNormalizada) return;

      if (!resumen[zonaNormalizada]) {
        resumen[zonaNormalizada] = {
          zona: reporte.zona,
          cantidad: 0
        };
      }

      resumen[zonaNormalizada].cantidad += 1;
    });

    return Object.values(resumen).sort((a, b) => b.cantidad - a.cantidad);
  }

  perteneceAZona(reporte, zonaBuscada) {
    return this.normalizarTexto(reporte.zona) === zonaBuscada;
  }

  formatearReporte(reporte) {
    return {
      zona: reporte.zona,
      descripcion: reporte.descripcion,
      estado: reporte.estado,
      ubicacion: reporte.direccion,
      fecha: reporte.fecha || FECHA_NO_REGISTRADA,
      likes: reporte.likes
    };
  }

  crearRespuesta(mensaje, reportes) {
    return {
      mensaje,
      reportes
    };
  }

  normalizarTexto(texto) {
    return String(texto || "").trim().toLowerCase();
  }
}