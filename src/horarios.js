import { obtenerRutasPorZona } from "./rutas.js";

class Horario {
  constructor(ruta, dia, hora) {
    this.ruta = ruta;
    this.dia = dia;
    this.hora = hora;
  }
}

class HorarioService {
  constructor(obtenerRutasPorZonaFn) {
    this.horarios = [];
    this.obtenerRutasPorZona = obtenerRutasPorZonaFn;
  }

  reset() {
    this.horarios = [];
  }

  crear(ruta, dia, hora) {
    this.validarDatos(ruta, dia, hora);

    const existe = this.horarios.find(
      h => h.ruta === ruta && h.dia === dia && h.hora === hora
    );

    if (existe) {
      throw new Error("Horario duplicado");
    }

    const nuevoHorario = new Horario(ruta, dia, hora);
    this.horarios.push(nuevoHorario);

    return nuevoHorario;
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

  eliminar(ruta, dia, hora, confirmado = false) {
    if (!confirmado) return;

    this.horarios = this.horarios.filter(
      h => !(h.ruta === ruta && h.dia === dia && h.hora === hora)
    );
  }

  editar(datosViejos, datosNuevos) {
    this.validarDatos(datosNuevos.ruta, datosNuevos.dia, datosNuevos.hora);

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

  validarDatos(ruta, dia, hora) {
    if (!ruta || !dia || !hora) {
      throw new Error("Datos incompletos");
    }
  }
}

const horarioService = new HorarioService(obtenerRutasPorZona);

export { Horario, HorarioService, horarioService };

export function resetHorarios() {
  horarioService.reset();
}

export function crearHorario(ruta, dia, hora) {
  return horarioService.crear(ruta, dia, hora);
}

export function obtenerHorariosPorRuta(ruta) {
  return horarioService.obtenerPorRuta(ruta);
}

export function obtenerHorariosPorZona(zona) {
  return horarioService.obtenerPorZona(zona);
}

export function eliminarHorario(ruta, dia, hora, confirmado = false) {
  horarioService.eliminar(ruta, dia, hora, confirmado);
}

export function editarHorario(datosViejos, datosNuevos) {
  horarioService.editar(datosViejos, datosNuevos);
}