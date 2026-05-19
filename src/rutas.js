class Ruta {
  constructor(zona, ruta) {
    this.zona = zona;
    this.ruta = ruta;
  }
}

class RutaService {
  constructor() {
    this.rutas = [];
  }

  reset() {
    this.rutas = [];
  }

  crear(zona, ruta) {
    if (!zona || !ruta) {
      throw new Error("Datos incompletos");
    }

    const nuevaRuta = new Ruta(zona, ruta);
    this.rutas.push(nuevaRuta);
    return nuevaRuta;
  }

  eliminar(zona, ruta) {
    if (!zona || !ruta) {
      throw new Error("Datos incompletos");
    }

    this.rutas = this.rutas.filter(r => !(r.zona === zona && r.ruta === ruta));
  }

  obtenerZonas() {
    return [...new Set(this.rutas.map(r => r.zona))];
  }

  obtenerPorZona(zona) {
    if (!zona || !zona.trim()) {
      throw new Error("Zona inválida");
    }

    const zonaLimpia = zona.trim().toLowerCase();

    return this.rutas.filter(r => r.zona.toLowerCase() === zonaLimpia);
  }

  editar(zona, nombreViejo, nombreNuevo) {
    if (!nombreNuevo) {
      throw new Error("Datos incompletos");
    }

    const rutaEncontrada = this.rutas.find(
      r => r.zona === zona && r.ruta === nombreViejo
    );

    if (rutaEncontrada) {
      rutaEncontrada.ruta = nombreNuevo;
    }
  }
}

const rutaService = new RutaService();

export { Ruta, RutaService, rutaService };

export function resetRutas() {
  rutaService.reset();
}

export function crearRuta(zona, ruta) {
  return rutaService.crear(zona, ruta);
}

export function eliminarRuta(zona, ruta) {
  rutaService.eliminar(zona, ruta);
}

export function obtenerZonas() {
  return rutaService.obtenerZonas();
}

export function obtenerRutasPorZona(zona) {
  return rutaService.obtenerPorZona(zona);
}

export function editarRuta(zona, nombreViejo, nombreNuevo) {
  rutaService.editar(zona, nombreViejo, nombreNuevo);
}