const formRegister = document.querySelector("#register-form");
const mensaje = document.querySelector("#mensaje-register");

formRegister.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value;
  const correo = document.querySelector("#correo").value;
  const password = document.querySelector("#password").value;

  if (!nombre || !correo || !password) {
    mensaje.textContent =
      "Complete todos los campos";
    return;
  }

  const usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];

  const existeUsuario = usuarios.find(
    usuario => usuario.correo === correo
  );

  if (existeUsuario) {
    mensaje.textContent =
      "El correo ya está registrado";
    return;
  }

  usuarios.push({
    nombre,
    correo,
    password
  });

  localStorage.setItem(
    "usuarios",
    JSON.stringify(usuarios)
  );

  mensaje.textContent =
    "Usuario registrado correctamente";

  formRegister.reset();
});