const MENSAJE_SIN_ZONA = "Selecciona una zona.";
const MENSAJE_SIN_REPORTES = "No existen reportes en la zona seleccionada.";
const FECHA_NO_REGISTRADA = "Sin fecha";

const ESTADO_PENDIENTE = "pendiente";
const ESTADO_RESUELTO = "resuelto";

const MENSAJE_ESTADO_ACTUALIZADO = "Estado actualizado correctamente.";
const MENSAJE_ERROR_CAMBIO_ESTADO = "No se pudo actualizar el estado del reporte.";
const MENSAJE_ESTADO_INVALIDO = "Estado inválido.";

class Reporte {
  constructor(zona, direccion, descripcion) {
    this.zona = zona;
    this.direccion = direccion;
    this.descripcion = descripcion;
    this.estado = ESTADO_PENDIENTE;
    this.likes = 0;
    this.fecha = new Date().toISOString();
  }

  darLike() {
    this.likes += 1;
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }

  obtenerClaseEstado() {
    return `estado-${this.estado}`;
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
      return this.crearRespuesta("No hay reportes registrados.", []);
    }

   return this.crearRespuesta("", [...this.reportes].sort((a, b) => b.likes - a.likes));
  }

  darLike(indice) {
    const reporte = this.obtenerReportePorIndice(indice);

    reporte.darLike();
  }

  cambiarEstado(indice, nuevoEstado) {
    if (!this.estadoValido(nuevoEstado)) {
      return this.crearRespuestaCambioEstado(
        MENSAJE_ESTADO_INVALIDO,
        null
      );
    }

    try {
      const reporte = this.obtenerReportePorIndice(indice);

      reporte.cambiarEstado(nuevoEstado);

      return this.crearRespuestaCambioEstado(
        MENSAJE_ESTADO_ACTUALIZADO,
        reporte
      );
    } catch (error) {
      return this.crearRespuestaCambioEstado(
        MENSAJE_ERROR_CAMBIO_ESTADO,
        null
      );
    }
  }


  editar(indice, datosActualizados) {
    if (
        !datosActualizados.zona ||
        !datosActualizados.direccion ||
        !datosActualizados.descripcion
    ) {
        return {
        mensaje: "Faltan datos obligatorios.",
        reporte: null
        };
    }

    const reporte = this.obtenerReportePorIndice(indice);

    reporte.zona = datosActualizados.zona;
    reporte.direccion = datosActualizados.direccion;
    reporte.descripcion = datosActualizados.descripcion;

    return {
        mensaje: "Reporte editado correctamente.",
        reporte
    };
  }

  obtenerPorZona(zona) {
    const zonaBuscada = this.normalizarTexto(zona);

    if (!zonaBuscada) {
      return this.crearRespuesta(MENSAJE_SIN_ZONA, []);
    }

    const reportesFiltrados = this.reportes
      .filter(reporte => this.perteneceAZona(reporte, zonaBuscada))
      .sort((a, b) => b.likes - a.likes)
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

  obtenerReportePorIndice(indice) {
    const indiceNumerico = Number(indice);
    const reporte = this.reportes[indiceNumerico];

    if (!reporte) {
      throw new Error("Reporte no encontrado");
    }

    return reporte;
  }

  estadoValido(estado) {
    return [ESTADO_PENDIENTE, ESTADO_RESUELTO].includes(estado);
  }

  perteneceAZona(reporte, zonaBuscada) {
    return this.normalizarTexto(reporte.zona) === zonaBuscada;
  }

  formatearReporte(reporte) {
    return {
      zona: reporte.zona,
      descripcion: reporte.descripcion,
      estado: reporte.estado,
      claseEstado: reporte.obtenerClaseEstado(),
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

  crearRespuestaCambioEstado(mensaje, reporte) {
    return {
      mensaje,
      reporte
    };
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

export function cambiarEstadoReporte(indice, nuevoEstado) {
  return reporteService.cambiarEstado(indice, nuevoEstado);
}
export function editarReporte(indice, datosActualizados) {
  return reporteService.editar(indice, datosActualizados);
}