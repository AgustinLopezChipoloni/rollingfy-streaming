import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { cancionesIniciales } from "../../helpers/DatosInicio";

const FormularioCancion = ({ titulo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const navegacion = useNavigate();

  const obtenerCancionesLocalStorage = () => {
    const cancionesGuardadas = JSON.parse(localStorage.getItem("canciones")) || [];

    if (cancionesGuardadas.length === 0) {
      localStorage.setItem("canciones", JSON.stringify(cancionesIniciales));
      return cancionesIniciales;
    }

    return cancionesGuardadas;
  };

  const generarNuevoId = (canciones) => {
    const idsNumericos = canciones.map((cancion) => Number(cancion.id));

    const idMayor = Math.max(...idsNumericos);

    const nuevoId = idMayor + 1;

    return String(nuevoId);
  };

  useEffect(() => {
    if (titulo === "Editar Canción") {
      const canciones = obtenerCancionesLocalStorage();

      const cancionBuscada = canciones.find(
        (cancion) => cancion.id === id
      );

      if (cancionBuscada) {
        reset(cancionBuscada);
      } else {
        Swal.fire({
          title: "Error",
          text: "No se encontró la canción para editar",
          icon: "error",
        });

        navegacion("/admin");
      }
    }
  }, [id, titulo, reset, navegacion]);

  const onSubmit = (cancion) => {
    const canciones = obtenerCancionesLocalStorage();

    if (titulo === "Crear Canción") {
      const nuevaCancion = {
        ...cancion,
        id: generarNuevoId(canciones),
      };

      const cancionesActualizadas = [...canciones, nuevaCancion];

      localStorage.setItem("canciones", JSON.stringify(cancionesActualizadas));

      Swal.fire({
        title: "Canción agregada",
        text: `La canción "${nuevaCancion.nombre}" se agregó correctamente`,
        icon: "success",
        confirmButtonColor: "#198754",
      });

      navegacion("/admin");
    } else {
      const cancionesActualizadas = canciones.map((cancionActual) => {
        if (cancionActual.id === id) {
          return {
            ...cancion,
            id: id,
          };
        }

        return cancionActual;
      });

      localStorage.setItem("canciones", JSON.stringify(cancionesActualizadas));

      Swal.fire({
        title: "Canción modificada",
        text: `La canción "${cancion.nombre}" se actualizó correctamente`,
        icon: "success",
        confirmButtonColor: "#198754",
      });

      navegacion("/admin");
    }
  };

  return (
    <div className="bg-dark min-vh-100 py-4">
      <Container>
        <h1 className="display-4 text-light">{titulo}</h1>
        <hr className="text-secondary" />

        <Form
          className="my-4 text-light p-4 rounded bg-dark border border-secondary"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="mb-3" controlId="formNombre">
            <Form.Label>Título de la canción*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: De Música Ligera"
              {...register("nombre", {
                required: "El título es obligatorio",
                minLength: {
                  value: 2,
                  message: "El título debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "El título debe tener como máximo 100 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.nombre?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formArtista">
            <Form.Label>Artista o Banda*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Soda Stereo"
              {...register("artista", {
                required: "El artista es un dato obligatorio",
                minLength: {
                  value: 2,
                  message: "El nombre del artista debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "El nombre del artista debe tener como máximo 100 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.artista?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAlbum">
            <Form.Label>Álbum*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Canción Animal"
              {...register("album", {
                required: "El álbum es un dato obligatorio",
                minLength: {
                  value: 2,
                  message: "El álbum debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "El álbum debe tener como máximo 100 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.album?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAnio">
            <Form.Label>Año*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: 2025"
              {...register("anio", {
                required: "El año es un dato obligatorio",
                minLength: {
                  value: 4,
                  message: "El año debe tener al menos 4 caracteres",
                },
                maxLength: {
                  value: 4,
                  message: "El año debe tener como máximo 4 caracteres",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.anio?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUrl">
            <Form.Label>URL del Embed de Spotify*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: https://open.spotify.com/embed/track/..."
              {...register("url", {
                required: "La URL es obligatoria",
                pattern: {
                  value: /^https:\/\/open\.spotify\.com\/embed\/.*/,
                  message: "Debe ser una URL válida de inserción embed de Spotify",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.url?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPortada">
            <Form.Label>URL de la portada*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: https://i.scdn.co/image/..."
              {...register("imagen", {
                required: "La URL de la portada es obligatoria",
              })}
            />
            <Form.Text className="text-danger">
              {errors.imagen?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGenero">
            <Form.Label>Género*</Form.Label>
            <Form.Select
              {...register("genero", {
                required: "Debe seleccionar un género",
              })}
            >
              <option value="">Seleccione una opción</option>
              <option value="Rock">Rock</option>
              <option value="Pop">Pop</option>
              <option value="Trap">Trap</option>
              <option value="Reggaeton">Reggaetón</option>
              <option value="Cumbia">Cumbia</option>
              <option value="Electronica">Electrónica</option>
              <option value="Indie">Indie</option>
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.genero?.message}
            </Form.Text>
          </Form.Group>

          <div className="d-flex gap-2 mt-4">
            <Button type="submit" variant="success" className="w-100">
              {titulo === "Crear Canción" ? "Guardar Canción" : "Guardar Cambios"}
            </Button>

            <Link to="/admin" className="btn btn-secondary w-100">
              Volver Atrás
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default FormularioCancion;