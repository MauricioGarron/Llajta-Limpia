import {
  crearRuta,
  eliminarRuta,
  obtenerZonas,
  obtenerRutasPorZona
} from "./rutas.js";

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