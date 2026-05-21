import {
  obtenerRutasPorZona,
  obtenerZonas
} from "./rutas.js";

const MENSAJE_DATOS_INCOMPLETOS = "Completa todos los datos obligatorios.";
const MENSAJE_HORARIO_OCUPADO = "El horario seleccionado ya está ocupado.";
const MENSAJE_RUTA_NO_DISPONIBLE = "La ruta seleccionada no está disponible.";
const MENSAJE_HORARIO_ASIGNADO = "Horario asignado correctamente.";
const MENSAJE_ENLACE_CORRECTO = "Ruta y horario enlazados correctamente.";
const MENSAJE_DATOS_ENLACE_INCOMPLETOS = "Completa los datos obligatorios antes de guardar.";
const MENSAJE_CONFLICTO_ENLACE = "La ruta ya tiene un horario asignado en el mismo rango.";

class Horario {
  constructor(ruta, dia, hora) {
    this.ruta = ruta;
    this.dia = dia;
    this.hora = hora;
  }
}

class HorarioService {
  constructor(
    obtenerRutasPorZonaFn = obtenerRutasPorZona,
    obtenerZonasFn = obtenerZonas
  ) {
    this.horarios = [];
    this.obtenerRutasPorZona = obtenerRutasPorZonaFn;
    this.obtenerZonas = obtenerZonasFn;
  }

  reset() {
    this.horarios = [];
  }

  crear(ruta, dia, hora) {
    this.validarDatos(ruta, dia, hora);

    if (this.existeConflicto(ruta, dia, hora)) {
      throw new Error("Horario duplicado");
    }

    const nuevoHorario = new Horario(ruta, dia, hora);
    this.horarios.push(nuevoHorario);
    return nuevoHorario;
  }

  asignar(ruta, dia, hora) {
    if (this.tieneDatosIncompletos(ruta, dia, hora)) {
      return this.crearRespuesta(MENSAJE_DATOS_INCOMPLETOS, null);
    }

    if (!this.rutaDisponible(ruta)) {
      return this.crearRespuesta(MENSAJE_RUTA_NO_DISPONIBLE, null);
    }

    if (this.existeConflicto(ruta, dia, hora)) {
      return this.crearRespuesta(MENSAJE_HORARIO_OCUPADO, null);
    }

    const horario = new Horario(ruta, dia, hora);
    this.horarios.push(horario);

    return this.crearRespuesta(MENSAJE_HORARIO_ASIGNADO, horario);
  }
  enlazarRutaHorario(ruta, dia, hora) {
  if (this.tieneDatosIncompletos(ruta, dia, hora)) {
    return this.crearRespuestaEnlace(MENSAJE_DATOS_ENLACE_INCOMPLETOS, null);
  }

  if (!this.rutaDisponible(ruta)) {
    return this.crearRespuestaEnlace(MENSAJE_RUTA_NO_DISPONIBLE, null);
  }

  if (this.existeConflicto(ruta, dia, hora)) {
    return this.crearRespuestaEnlace(MENSAJE_CONFLICTO_ENLACE, null);
  }

  const enlace = new Horario(ruta, dia, hora);
  this.horarios.push(enlace);

  return this.crearRespuestaEnlace(MENSAJE_ENLACE_CORRECTO, enlace);
}

  obtenerPorRuta(ruta) {
    return this.horarios.filter(h => h.ruta === ruta);
  }

  obtenerPorZona(zona) {
    if (!zona) return [];

    const rutas = this.obtenerRutasPorZona(zona);
    const nombresRutas = new Set(rutas.map(r => r.ruta));

    return this.horarios.filter(h => nombresRutas.has(h.ruta));
  }

  obtenerProgramacion() {
    return [...this.horarios];
  }
  obtenerRutasProgramadas() {
  return [...this.horarios];
  }

  obtenerRutasDisponibles() {
    let rutasDisponibles = [];

    this.obtenerZonas().forEach(zona => {
      const rutas = this.obtenerRutasPorZona(zona);
      rutasDisponibles = rutasDisponibles.concat(rutas);
    });

    return rutasDisponibles;
  }

  eliminar(ruta, dia, hora, confirmado = false) {
    if (!confirmado) return;

    this.horarios = this.horarios.filter(
      h => !(h.ruta === ruta && h.dia === dia && h.hora === hora)
    );
  }

  editar(datosViejos, datosNuevos) {
    this.validarDatos(
      datosNuevos.ruta,
      datosNuevos.dia,
      datosNuevos.hora
    );

    const horario = this.horarios.find(
      h =>
        h.ruta === datosViejos.ruta &&
        h.dia === datosViejos.dia &&
        h.hora === datosViejos.hora
    );

    if (horario) {
      Object.assign(horario, datosNuevos);
    }
  }

  rutaDisponible(ruta) {
    const rutaBuscada = this.normalizarTexto(ruta);

    return this.obtenerRutasDisponibles().some(
      rutaDisponible => this.normalizarTexto(rutaDisponible.ruta) === rutaBuscada
    );
  }

  existeConflicto(ruta, dia, hora) {
    return this.horarios.some(
      h =>
        this.normalizarTexto(h.ruta) === this.normalizarTexto(ruta) &&
        this.normalizarTexto(h.dia) === this.normalizarTexto(dia) &&
        this.normalizarTexto(h.hora) === this.normalizarTexto(hora)
    );
  }

  tieneDatosIncompletos(ruta, dia, hora) {
    return !ruta || !dia || !hora;
  }

  validarDatos(ruta, dia, hora) {
    if (this.tieneDatosIncompletos(ruta, dia, hora)) {
      throw new Error("Datos incompletos");
    }
  }

  crearRespuesta(mensaje, horario) {
    return {
      mensaje,
      horario
    };
  }

  crearRespuestaEnlace(mensaje, enlace) {
  return {
    mensaje,
    enlace
  };
}

  normalizarTexto(texto) {
    return String(texto || "").trim().toLowerCase();
  }
}

const horarioService = new HorarioService();

export { Horario, HorarioService, horarioService };

export function resetHorarios() {
  horarioService.reset();
}

export function crearHorario(ruta, dia, hora) {
  return horarioService.crear(ruta, dia, hora);
}

export function asignarHorario(ruta, dia, hora) {
  return horarioService.asignar(ruta, dia, hora);
}

export function obtenerHorariosPorRuta(ruta) {
  return horarioService.obtenerPorRuta(ruta);
}

export function obtenerHorariosPorZona(zona) {
  return horarioService.obtenerPorZona(zona);
}

export function obtenerProgramacion() {
  return horarioService.obtenerProgramacion();
}

export function obtenerRutasDisponibles() {
  return horarioService.obtenerRutasDisponibles();
}

export function eliminarHorario(ruta, dia, hora, confirmado = false) {
  horarioService.eliminar(ruta, dia, hora, confirmado);
}

export function editarHorario(datosViejos, datosNuevos) {
  horarioService.editar(datosViejos, datosNuevos);
}

export function enlazarRutaHorario(ruta, dia, hora) {
  return horarioService.enlazarRutaHorario(ruta, dia, hora);
}

export function obtenerRutasProgramadas() {
  return horarioService.obtenerRutasProgramadas();
}