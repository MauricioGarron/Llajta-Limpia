import {
  crearRuta,
  eliminarRuta,
  obtenerZonas,
  obtenerRutasPorZona,
  editarRuta
} from "./rutas.js";

import {
  crearReporte,
  verReportes,
  darLikeReporte,
  cambiarEstadoReporte,
  VerReportesPorZona
} from "./reportes.js";

import {
  enlazarRutaHorario,
  obtenerHorariosPorRuta,
  obtenerHorariosPorZona,
  obtenerRutasProgramadas,
  obtenerRutasDisponibles,
  eliminarHorario,
  editarHorario
} from "./horarios.js";

// --------------------
// RUTAS
// --------------------

const formRuta = document.querySelector("#ruta-form");
const selectZona = document.querySelector("#filtro-zona");
const resultadoDiv = document.querySelector("#resultado-div");

// Crear ruta
formRuta.addEventListener("submit", function (e) {
  e.preventDefault();

  const zona = document.querySelector("#zona").value;
  const ruta = document.querySelector("#ruta").value;

  try {
    crearRuta(zona, ruta);
    actualizarZonas();
    renderRutas(zona);
    alert("Ruta creada");
  } catch (error) {
    alert(error.message);
  }
});

// Actualizar zonas
function actualizarZonas() {
  const zonas = obtenerZonas();

  selectZona.innerHTML = '<option value="">Selecciona zona</option>';
  selectZonaHorarios.innerHTML = '<option value="">Selecciona zona</option>';

  zonas.forEach(z => {
    selectZona.innerHTML += `<option value="${z}">${z}</option>`;
    selectZonaHorarios.innerHTML += `<option value="${z}">${z}</option>`;
  });

  actualizarRutasDisponiblesParaHorarios();
}

// Cambiar zona
selectZona.addEventListener("change", function () {
  const zona = selectZona.value;
  renderRutas(zona);
});

// Render rutas
function renderRutas(zona) {
  const rutas = obtenerRutasPorZona(zona);

  resultadoDiv.innerHTML = "";

  if (rutas.length === 0) {
    resultadoDiv.innerHTML = "<p>No hay rutas</p>";
    return;
  }

  rutas.forEach(r => {
    resultadoDiv.innerHTML += `
      <p>
        ${r.ruta}
        <button onclick="editarRutaUI('${r.zona}', '${r.ruta}')">
          Editar
        </button>
        <button onclick="eliminarRutaUI('${r.zona}', '${r.ruta}')">
          Eliminar
        </button>
      </p>
    `;
  });
}

// Eliminar ruta
window.eliminarRutaUI = function (zona, ruta) {
  if (confirm("¿Seguro que deseas eliminar esta ruta?")) {
    eliminarRuta(zona, ruta);
    renderRutas(zona);
  }
};

// Editar ruta
window.editarRutaUI = function (zona, nombreViejo) {
  const nuevoNombre = prompt("Nuevo nombre para la ruta:", nombreViejo);
  if (nuevoNombre) {
    try {
      editarRuta(zona, nombreViejo, nuevoNombre);
      renderRutas(zona);
    } catch (error) {
      alert(error.message);
    }
  }
};

// --------------------
// HORARIOS
// --------------------

const formHorario = document.querySelector("#horario-form");
const horariosDiv = document.querySelector("#horarios-div");
const selectHorarioRuta = document.querySelector("#horario-ruta");
const mensajeEnlaceRutaHorario = document.querySelector("#mensaje-enlace-ruta-horario");
const rutasProgramadasDiv = document.querySelector("#rutas-programadas-div");

// Crear horario
formHorario.addEventListener("submit", function (e) {
  e.preventDefault();

  const ruta = selectHorarioRuta.value;
  const dia = document.querySelector("#dia").value;
  const hora = document.querySelector("#hora").value;

  const resultado = enlazarRutaHorario(ruta, dia, hora);

mensajeEnlaceRutaHorario.textContent = resultado.mensaje;

if (resultado.enlace) {
  formHorario.reset();
  renderRutasProgramadas();
}
});

// --------------------
// FUNCIONES DE ASIGNAR HORARIOS
// --------------------

function actualizarRutasDisponiblesParaHorarios() {
  const rutas = obtenerRutasDisponibles();

  selectHorarioRuta.innerHTML = '<option value="">Selecciona una ruta</option>';

  rutas.forEach(ruta => {
    selectHorarioRuta.innerHTML += `
      <option value="${ruta.ruta}">${ruta.ruta}</option>
    `;
  });
}

function renderRutasProgramadas() {
  const rutasProgramadas = obtenerRutasProgramadas();

  rutasProgramadasDiv.innerHTML = "";

  if (rutasProgramadas.length === 0) {
    rutasProgramadasDiv.innerHTML = "<p>No hay rutas programadas.</p>";
    return;
  }

  rutasProgramadas.forEach(enlace => {
    rutasProgramadasDiv.innerHTML += `
      <p>
        <strong>Ruta:</strong> ${enlace.ruta} |
        <strong>Día:</strong> ${enlace.dia} |
        <strong>Hora:</strong> ${enlace.hora}
      </p>
    `;
  });
}

// Buscar horarios
const btnBuscar = document.querySelector("#btn-buscar");

btnBuscar.addEventListener("click", function () {
  const ruta = document.querySelector("#buscar-ruta").value;

  const horarios = obtenerHorariosPorRuta(ruta);

  horariosDiv.innerHTML = "";

  if (horarios.length === 0) {
    horariosDiv.innerHTML = "<p>No hay horarios</p>";
    return;
  }

  horarios.forEach(h => {
    horariosDiv.innerHTML += `<p>${h.dia} - ${h.hora}
    <button onclick="editarHorarioUI('${h.ruta}', '${h.dia}', '${h.hora}')">Editar</button>
    <button onclick="eliminarHorarioUI('${h.ruta}', '${h.dia}', '${h.hora}')">Eliminar</button>
    </p>`;
  });
});

// Mostrar horarios por zona

const selectZonaHorarios = document.querySelector("#filtro-zona-horarios");
const horariosZonaDiv = document.querySelector("#horarios-zona-div");

selectZonaHorarios.addEventListener("change", function () {
  const zona = selectZonaHorarios.value; // ✔️ primero declarar

  console.log("Zona:", zona);
  console.log("Rutas:", obtenerRutasPorZona(zona));
  console.log("Horarios:", obtenerHorariosPorZona(zona));

  const horarios = obtenerHorariosPorZona(zona);

  horariosZonaDiv.innerHTML = "";

  if (horarios.length === 0) {
    horariosZonaDiv.innerHTML = "<p>No hay horarios</p>";
    return;
  }

  horarios.forEach(h => {
    horariosZonaDiv.innerHTML += `<p>${h.ruta} - ${h.dia} - ${h.hora}
    <button onclick="editarHorarioUI('${h.ruta}', '${h.dia}', '${h.hora}')">Editar</button>
    <button onclick="eliminarHorarioUI('${h.ruta}', '${h.dia}', '${h.hora}')">Eliminar</button>
    
    </p>`;
  });
});

// Eliminar horario
window.eliminarHorarioUI = function (ruta, dia, hora) {
  if (confirm(`¿Deseas eliminar el horario de ${dia} a las ${hora}?`)) {
    eliminarHorario(ruta, dia, hora, true);
    alert("Horario eliminado. Busque de nuevo para refrescar.");
  }
};

// Editar horario
window.editarHorarioUI = function (ruta, dia, hora) {
  const nuevoDia = prompt("Nuevo día:", dia);
  const nuevaHora = prompt("Nueva hora:", hora);

  if (nuevoDia && nuevaHora) {
    try {
      const viejo = { ruta, dia, hora };
      const nuevo = { ruta, dia: nuevoDia, hora: nuevaHora };
      editarHorario(viejo, nuevo);
      alert("Horario editado. Busque de nuevo para refrescar.");
    } catch (error) {
      alert(error.message);
    }
  }
};


// --------------------
// REPORTES
// --------------------

const formReporte = document.querySelector("#reporte-form");
const mensajeReporte = document.querySelector("#mensaje-reporte");
const verReportesPorZonaService = new VerReportesPorZona();

formReporte.addEventListener("submit", function (e) {
  e.preventDefault();

  const zona = document.querySelector("#reporte-zona").value;
  const direccion = document.querySelector("#reporte-direccion").value;
  const descripcion = document.querySelector("#reporte-descripcion").value;

  try {
  crearReporte(zona, direccion, descripcion);
  mensajeReporte.textContent = "Reporte enviado exitosamente.";
  formReporte.reset();

  actualizarZonasReportes();
  renderResumenReportesPorZona();
} catch (error) {
  mensajeReporte.textContent = error.message;
}
});


const botonVerReportes = document.querySelector("#ver-reportes");
const listaReportes = document.querySelector("#lista-reportes");
const mensajeListaReportes = document.querySelector("#mensaje-lista-reportes");
const mensajeCambiarEstado = document.querySelector("#mensaje-cambiar-estado");

function renderReportes() {
  const resultado = verReportes();

  listaReportes.innerHTML = "";
  mensajeListaReportes.textContent = resultado.mensaje;

  resultado.reportes.forEach((reporte, indice) => {
    const item = document.createElement("li");

    item.innerHTML = `
      <strong>Zona:</strong> ${reporte.zona} <br>
      <strong>Dirección:</strong> ${reporte.direccion} <br>
      <strong>Descripción:</strong> ${reporte.descripcion} <br>
      <strong>Estado:</strong> 
      <span class="estado-reporte ${reporte.obtenerClaseEstado()}">
        ${reporte.estado}
      </span>
      <br>

      <label>Cambiar estado:</label>
      <select id="estado-reporte-${indice}">
        <option value="pendiente" ${reporte.estado === "pendiente" ? "selected" : ""}>
          Pendiente
        </option>
        <option value="resuelto" ${reporte.estado === "resuelto" ? "selected" : ""}>
          Resuelto
        </option>
      </select>

      <button class="cambiar-estado-btn" data-indice="${indice}">
        Actualizar estado
      </button>
      <br>

      <strong>Likes:</strong> <span id="likes-${indice}">${reporte.likes}</span>
      <button class="like-btn" data-indice="${indice}">Like</button>
    `;

    listaReportes.appendChild(item);
  });

  const botonesLike = document.querySelectorAll(".like-btn");

  botonesLike.forEach((boton) => {
    boton.addEventListener("click", () => {
      const indice = boton.dataset.indice;
      darLikeReporte(indice);
      renderReportes();
    });
  });

  const botonesCambiarEstado = document.querySelectorAll(".cambiar-estado-btn");

  botonesCambiarEstado.forEach((boton) => {
    boton.addEventListener("click", () => {
      const indice = boton.dataset.indice;
      const nuevoEstado = document.querySelector(`#estado-reporte-${indice}`).value;

      const resultado = cambiarEstadoReporte(indice, nuevoEstado);

      mensajeCambiarEstado.textContent = resultado.mensaje;

      renderReportes();
      renderResumenReportesPorZona();

      if (selectReportesZona.value) {
        renderReportesPorZona();
      }
    });
  });
}

botonVerReportes.addEventListener("click", () => {
  renderReportes();
});
// --------------------
// VER REPORTES POR ZONA
// --------------------

const selectReportesZona = document.querySelector("#filtro-reportes-zona");
const botonVerReportesZona = document.querySelector("#btn-ver-reportes-zona");
const mensajeReportesZona = document.querySelector("#mensaje-reportes-zona");
const listaReportesZona = document.querySelector("#lista-reportes-zona");
const resumenReportesZona = document.querySelector("#resumen-reportes-zona");

function actualizarZonasReportes() {
  const zonas = verReportesPorZonaService.obtenerZonasConReportes();

  selectReportesZona.innerHTML = '<option value="">Selecciona zona</option>';

  zonas.forEach(zona => {
    selectReportesZona.innerHTML += `<option value="${zona}">${zona}</option>`;
  });
}

function renderReportesPorZona() {
  const zona = selectReportesZona.value;

  const resultado = verReportesPorZonaService.obtenerReportesPorZona(zona);

  listaReportesZona.innerHTML = "";
  mensajeReportesZona.textContent = resultado.mensaje;

  resultado.reportes.forEach(reporte => {
    const item = document.createElement("li");

    item.innerHTML = `
      <strong>Zona:</strong> ${reporte.zona} <br>
      <strong>Ubicación:</strong> ${reporte.ubicacion} <br>
      <strong>Descripción:</strong> ${reporte.descripcion} <br>
      <strong>Estado:</strong> 
      <span class="estado-reporte ${reporte.claseEstado}">
        ${reporte.estado}
      </span> <br>
      <strong>Fecha:</strong> ${reporte.fecha}
    `;

    listaReportesZona.appendChild(item);
  });
}

function renderResumenReportesPorZona() {
  const resumen = verReportesPorZonaService.obtenerResumenPorZona();

  resumenReportesZona.innerHTML = "";

  if (resumen.length === 0) {
    resumenReportesZona.innerHTML = "<p>No hay incidencias registradas por zona.</p>";
    return;
  }

  resumen.forEach(item => {
    resumenReportesZona.innerHTML += `
      <p>
        <strong>${item.zona}</strong>: ${item.cantidad} incidencia(s)
      </p>
    `;
  });
}

botonVerReportesZona.addEventListener("click", renderReportesPorZona);

selectReportesZona.addEventListener("change", renderReportesPorZona);

actualizarZonasReportes();
renderResumenReportesPorZona();
actualizarRutasDisponiblesParaHorarios();
renderRutasProgramadas();
