import {
  crearRuta,
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

formRuta.addEventListener("submit", (e) => {
  e.preventDefault();

  const zona = document.querySelector("#zona").value;
  const ruta = document.querySelector("#ruta").value;

  try {
    crearRuta(zona, ruta);
    actualizarZonas();
    alert("Ruta creada");
  } catch (error) {
    alert(error.message);
  }
});

function actualizarZonas() {
  const zonas = obtenerZonas();

  selectZona.innerHTML = '<option value="">Selecciona zona</option>';

  zonas.forEach(z => {
    selectZona.innerHTML += `<option value="${z}">${z}</option>`;
  });
}

selectZona.addEventListener("change", () => {
  const zona = selectZona.value;
  const rutas = obtenerRutasPorZona(zona);

  resultadoDiv.innerHTML = "";

  rutas.forEach(r => {
    resultadoDiv.innerHTML += `<p>${r.ruta}</p>`;
  });
});


// --------------------
// HORARIOS
// --------------------

const formHorario = document.querySelector("#horario-form");
const horariosDiv = document.querySelector("#horarios-div");

formHorario.addEventListener("submit", (e) => {
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

const btnBuscar = document.querySelector("#btn-buscar");

btnBuscar.addEventListener("click", () => {
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