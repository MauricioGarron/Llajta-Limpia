const formLogin = document.querySelector("#login-form");

const mensaje = document.querySelector("#mensaje-login");

let intentosFallidos = 0;

let bloqueadoHasta = null;

formLogin.addEventListener("submit", function (e) {

  e.preventDefault();

  const ahora = Date.now();

  if (
    bloqueadoHasta &&
    ahora < bloqueadoHasta
  ) {

    mensaje.textContent =
      "Usuario bloqueado temporalmente";

    return;
  }

  const correo =
    document.querySelector("#correo").value;

  const password =
    document.querySelector("#password").value;

  if (!correo || !password) {

    mensaje.textContent =
      "Complete todos los campos";

    return;
  }

  const usuarios =
    JSON.parse(
      localStorage.getItem("usuarios")
    ) || [];

  const usuarioEncontrado =
    usuarios.find(
      usuario =>
        usuario.correo === correo &&
        usuario.password === password
    );

  if (usuarioEncontrado) {

    intentosFallidos = 0;

    localStorage.setItem(
      "usuarioActivo",
      correo
    );

    window.location.href =
      "./home.html";

    return;
  }

  intentosFallidos++;

  if (intentosFallidos >= 3) {

    bloqueadoHasta =
      Date.now() + 30000;

    mensaje.textContent =
      "Usuario bloqueado temporalmente";

    return;
  }

  mensaje.textContent =
    "Credenciales incorrectas";

});