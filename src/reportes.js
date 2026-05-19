class Reporte {
  constructor(zona, direccion, descripcion) {
    this.zona = zona;
    this.direccion = direccion;
    this.descripcion = descripcion;
    this.estado = "enviado";
    this.likes = 0;
  }

  darLike() {
    this.likes++;
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

    const nuevoReporte = new Reporte(
      zona,
      direccion,
      descripcion
    );

    this.reportes.push(nuevoReporte);

    return nuevoReporte;
  }

  obtenerTodos() {
    return this.reportes;
  }

  obtenerPorZona(zona) {
    return this.reportes.filter(
      r => r.zona === zona
    );
  }

  darLike(indice) {
    if (!this.reportes[indice]) {
      throw new Error("Reporte no encontrado");
    }

    this.reportes[indice].darLike();
  }

  cambiarEstado(indice, estado) {
    if (!this.reportes[indice]) {
      throw new Error("Reporte no encontrado");
    }

    this.reportes[indice].cambiarEstado(estado);
  }
}

const reporteService = new ReporteService();

export {
  Reporte,
  ReporteService,
  reporteService
};

export function resetReportes() {
  reporteService.reset();
}

export function crearReporte(
  zona,
  direccion,
  descripcion
) {
  return reporteService.crear(
    zona,
    direccion,
    descripcion
  );
}

export function obtenerReportes() {
  return reporteService.obtenerTodos();
}

export function obtenerReportesPorZona(zona) {
  return reporteService.obtenerPorZona(zona);
}

export function darLikeReporte(indice) {
  reporteService.darLike(indice);
}

export function cambiarEstadoReporte(
  indice,
  estado
) {
  reporteService.cambiarEstado(
    indice,
    estado
  );
}