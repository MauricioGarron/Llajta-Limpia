import {
  crearRuta,
  obtenerZonas,
  obtenerRutasPorZona
} from "./rutas.js";

const form = document.querySelector("#ruta-form");
const zonaInput = document.querySelector("#zona");
const rutaInput = document.querySelector("#ruta");

const filtroZona = document.querySelector("#filtro-zona");
const resultadoDiv = document.querySelector("#resultado-div");

// GUARDAR
form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    crearRuta(zonaInput.value, rutaInput.value);

    actualizarSelect();

    resultadoDiv.innerHTML = "Ruta guardada";

    zonaInput.value = "";
    rutaInput.value = "";
  } catch (e) {
    resultadoDiv.innerHTML = e.message;
  }
});

// ACTUALIZAR SELECT
function actualizarSelect() {
  const zonas = obtenerZonas();

  filtroZona.innerHTML = `<option value="">Selecciona zona</option>`;

  zonas.forEach(z => {
    filtroZona.innerHTML += `<option value="${z}">${z}</option>`;
  });
}

// MOSTRAR
filtroZona.addEventListener("change", () => {
  const zona = filtroZona.value;

  const rutas = obtenerRutasPorZona(zona);

  resultadoDiv.innerHTML = rutas.length
    ? rutas.map(r => `<p>${r.ruta}</p>`).join("")
    : "No hay rutas";
});