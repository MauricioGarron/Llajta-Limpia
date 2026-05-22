export function recuperarPassword(
  correo,
  nuevaPassword
) {

  if (!correo || !nuevaPassword) {

    return {
      exito: false,
      mensaje: "Complete todos los campos"
    };

  }

  const usuarios =
    JSON.parse(
      localStorage.getItem("usuarios")
    ) || [];

  const indiceUsuario =
    usuarios.findIndex(
      usuario => usuario.correo === correo
    );

  if (indiceUsuario === -1) {

    return {
      exito: false,
      mensaje: "Correo no encontrado"
    };

  }

  usuarios[indiceUsuario].password =
    nuevaPassword;

  localStorage.setItem(
    "usuarios",
    JSON.stringify(usuarios)
  );

  return {
    exito: true,
    mensaje:
      "Contraseña actualizada correctamente"
  };

}