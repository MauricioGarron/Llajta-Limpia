const MENSAJE_SIN_ZONA = "Selecciona una zona.";
const MENSAJE_SIN_REPORTES = "No existen reportes en la zona seleccionada.";
const FECHA_NO_REGISTRADA = "Sin fecha";

class Reporte {
  constructor(zona, direccion, descripcion) {
    this.zona = zona;
    this.direccion = direccion;
    this.descripcion = descripcion;
    this.estado = "enviado";
    this.likes = 0;
  }

  darLike() {
    this.likes += 1;
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
}

class ReporteService {
  constructor() {
    this.reportes = [];
  }

  reset() {
    this.reportes = [];
  }

  crear(zona, direccion, descripcion) {
    if (!zona || !direccion || !descripcion) {
      throw new Error("Faltan datos obligatorios");
    }

    const reporte = new Reporte(zona, direccion, descripcion);
    this.reportes.push(reporte);
    return reporte;
  }

  obtenerTodos() {
    return this.reportes;
  }

  verTodos() {
    if (this.reportes.length === 0) {
      return {
        mensaje: "No hay reportes registrados.",
        reportes: []
      };
    }

    return {
      mensaje: "",
      reportes: this.reportes
    };
  }

  darLike(indice) {
    if (!this.reportes[indice]) {
      throw new Error("Reporte no encontrado");
    }

    this.reportes[indice].darLike();
  }

  obtenerPorZona(zona) {
    const zonaBuscada = this.normalizarTexto(zona);

    if (!zonaBuscada) {
      return this.crearRespuesta(MENSAJE_SIN_ZONA, []);
    }

    const reportesFiltrados = this.reportes
      .filter(reporte => this.perteneceAZona(reporte, zonaBuscada))
      .map(reporte => this.formatearReporte(reporte));

    if (reportesFiltrados.length === 0) {
      return this.crearRespuesta(MENSAJE_SIN_REPORTES, []);
    }

    return this.crearRespuesta("", reportesFiltrados);
  }

  obtenerZonasConReportes() {
    const zonas = new Map();

    this.reportes.forEach(reporte => {
      const zonaNormalizada = this.normalizarTexto(reporte.zona);

      if (zonaNormalizada) {
        zonas.set(zonaNormalizada, reporte.zona);
      }
    });

    return Array.from(zonas.values());
  }

  obtenerResumenPorZona() {
    const resumen = {};

    this.reportes.forEach(reporte => {
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

    return Object.values(resumen).sort(
      (a, b) => b.cantidad - a.cantidad
    );
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
    return { mensaje, reportes };
  }

  normalizarTexto(texto) {
    return String(texto || "").trim().toLowerCase();
  }
}

class VerReportesPorZona {
  constructor(servicio = reporteService) {
    this.servicio = servicio;
  }

  obtenerReportesPorZona(zona) {
    return this.servicio.obtenerPorZona(zona);
  }

  obtenerZonasConReportes() {
    return this.servicio.obtenerZonasConReportes();
  }

  obtenerResumenPorZona() {
    return this.servicio.obtenerResumenPorZona();
  }
}

const reporteService = new ReporteService();

export {
  Reporte,
  ReporteService,
  VerReportesPorZona,
  reporteService
};

export function resetReportes() {
  reporteService.reset();
}

export function crearReporte(zona, direccion, descripcion) {
  return reporteService.crear(zona, direccion, descripcion);
}

export function obtenerReportes() {
  return reporteService.obtenerTodos();
}

export function verReportes() {
  return reporteService.verTodos();
}

export function darLikeReporte(indice) {
  reporteService.darLike(indice);
}