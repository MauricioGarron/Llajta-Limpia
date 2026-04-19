import {
  crearRuta,
  eliminarRuta,
  obtenerZonas,
  obtenerRutasPorZona
} from "./rutas.js";

import {
  crearReporte
} from "./crear-reporte/crear-reporte.js";

import { verReportes, darLikeReporte } from "./ver-reportes/ver-reportes.js";

import {
  crearHorario,
  obtenerHorariosPorRuta
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

  zonas.forEach(z => {
    selectZona.innerHTML += `<option value="${z}">${z}</option>`;
  });
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

// --------------------
// HORARIOS
// --------------------

const formHorario = document.querySelector("#horario-form");
const horariosDiv = document.querySelector("#horarios-div");

// Crear horario
formHorario.addEventListener("submit", function (e) {
  e.preventDefault();

  const ruta = document.querySelector("#horario-ruta").value;
  const dia = document.querySelector("#dia").value;
  const hora = document.querySelector("#hora").value;

  try {
    crearHorario(ruta, dia, hora);
    alert("Horario creado");
  } catch (error) {
    alert(error.message);
  }
});

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
    horariosDiv.innerHTML += `<p>${h.dia} - ${h.hora}</p>`;
  });
});

// --------------------
// REPORTES
// --------------------

const formReporte = document.querySelector("#reporte-form");
const mensajeReporte = document.querySelector("#mensaje-reporte");

formReporte.addEventListener("submit", function (e) {
  e.preventDefault();

  const zona = document.querySelector("#reporte-zona").value;
  const direccion = document.querySelector("#reporte-direccion").value;
  const descripcion = document.querySelector("#reporte-descripcion").value;

  try {
    crearReporte(zona, direccion, descripcion);
    mensajeReporte.textContent = "Reporte enviado exitosamente.";
    formReporte.reset();
  } catch (error) {
    mensajeReporte.textContent = error.message;
  }
});


const botonVerReportes = document.querySelector("#ver-reportes");
const listaReportes = document.querySelector("#lista-reportes");
const mensajeListaReportes = document.querySelector("#mensaje-lista-reportes");

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
}

botonVerReportes.addEventListener("click", () => {
  renderReportes();
});
