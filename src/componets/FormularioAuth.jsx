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


}