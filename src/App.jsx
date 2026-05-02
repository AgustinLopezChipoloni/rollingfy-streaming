import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import NavBar from "./componets/NavBar";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from './pages/Home';
import DetalleCancion from "./pages/DetalleCancion";
import Footer from './componets/Footer';
import FormularioCancion from "./pages/Canciones/FormularioCancion";
import Admin from "./pages/Admin";


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/" element={<Home />} />
        <Route path="/detalle/:id" element={<DetalleCancion />} />

        <Route path="/admin" element={<Admin />} />
        
        <Route path="/admin/crear" element={<FormularioCancion titulo="Crear Canción" />} />
        <Route path="/admin/editar/:id" element={<FormularioCancion titulo="Editar Canción" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;