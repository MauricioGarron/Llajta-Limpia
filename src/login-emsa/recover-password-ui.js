import {
  recuperarPassword
} from "./recover-password";

const form =
  document.querySelector(
    "#recover-form"
  );

const mensaje =
  document.querySelector(
    "#mensaje"
  );

form.addEventListener(
  "submit",
  function (e) {

    e.preventDefault();

    const correo =
      document.querySelector(
        "#correo"
      ).value;

    const nuevaPassword =
      document.querySelector(
        "#nueva-password"
      ).value;

    const resultado =
      recuperarPassword(
        correo,
        nuevaPassword
      );

    mensaje.textContent =
      resultado.mensaje;

    if (resultado.exito) {

      setTimeout(() => {

        window.location.href =
          "index.html";

      }, 1500);

    }

  }
);