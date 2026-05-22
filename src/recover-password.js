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
    exito: false
  };

}

export {
  recuperarPassword
};