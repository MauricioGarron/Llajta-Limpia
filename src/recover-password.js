function recuperarPassword(
  usuarios,
  correo,
  nuevaPassword
) {

  const usuarioEncontrado =
    usuarios.find(
      usuario =>
        usuario.correo === correo
    );

  if (!usuarioEncontrado) {

    return {
      exito: false,
      mensaje:
        "Correo no encontrado"
    };

  }

  if (nuevaPassword) {

    usuarioEncontrado.password =
      nuevaPassword;

  }

  return {
    exito: true
  };

}

export {
  recuperarPassword
};