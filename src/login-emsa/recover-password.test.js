import {
  recuperarPassword
} from "./recover-password";

describe(
  "Recuperar contraseña",
  () => {

    beforeEach(() => {

      global.localStorage = {

        store: {},

        getItem(key) {

          return this.store[key] || null;

        },

        setItem(key, value) {

          this.store[key] = value;

        },

        clear() {

          this.store = {};

        }

      };

      localStorage.clear();

    });

    test(
      "actualiza contraseña correctamente",
      () => {

        const usuarios = [
          {
            correo: "alex@gmail.com",
            password: "123456"
          }
        ];

        localStorage.setItem(
          "usuarios",
          JSON.stringify(usuarios)
        );

        const resultado =
          recuperarPassword(
            "alex@gmail.com",
            "999999"
          );

        expect(
          resultado.exito
        ).toBe(true);

        expect(
          resultado.mensaje
        ).toBe(
          "Contraseña actualizada correctamente"
        );

      }
    );

    test(
      "falla si correo no existe",
      () => {

        const resultado =
          recuperarPassword(
            "fake@gmail.com",
            "123456"
          );

        expect(
          resultado.exito
        ).toBe(false);

        expect(
          resultado.mensaje
        ).toBe(
          "Correo no encontrado"
        );

      }
    );

    test(
      "falla si campos vacíos",
      () => {

        const resultado =
          recuperarPassword(
            "",
            ""
          );

        expect(
          resultado.exito
        ).toBe(false);

        expect(
          resultado.mensaje
        ).toBe(
          "Complete todos los campos"
        );

      }
    );

  }
);