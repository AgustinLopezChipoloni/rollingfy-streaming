import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { guardarUsuario } from "../helpers/LocalStorage";
import "../App.css";

const Registro = () => { 
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navegacion = useNavigate();

   const onSubmit = (datos) => {
    if (datos.password !== datos.confirmarPassword) {
      return Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error",
      });
    }
        const usuarioNuevo = {
      nombreUsuario: datos.nombreUsuario,
      email: datos.correo.toLowerCase().trim(),
      password: datos.password,
      rol: 'usuario',
    };
    const respuesta = guardarUsuario(usuarioNuevo);

        if (respuesta.exito) {
      Swal.fire({
        title: "¡Bienvenido!",
        text: "Tu cuenta ha sido creada correctamente",
        icon: "success",
      });
      navegacion("/login");
    }
    else {
    Swal.fire({
      title: "Error",
      text: respuesta.mensaje || "No se pudo crear la cuenta",
      icon: "error",
    });
    }

};
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
}