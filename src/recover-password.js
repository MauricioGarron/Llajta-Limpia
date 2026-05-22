function recuperarPassword(
  usuarios,
  correo
) {

  const usuarioEncontrado =
    usuarios.find(
      usuario =>
        usuario.correo === correo
    );

  if (usuarioEncontrado) {

    return {
      exito: true
    };

  }

  return {
    exito: false,
    mensaje:
      "Correo no encontrado"
  };

}

export {
  recuperarPassword
};