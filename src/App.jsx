import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./componets/NavBar";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/Home";
import DetalleCancion from "./pages/DetalleCancion";
import Admin from "./pages/Admin";
import Footer from "./componets/Footer";
import FormularioCancion from "./pages/Canciones/FormularioCancion";
import { useState } from "react";

import RutaProtegida from "./componets/ProtectorAdmin"; 

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/Login" element={<Login setUsuarioLogueado={setUsuarioLogueado} />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/" element={<Home />} />
          <Route path="/detalle/:id" element={<DetalleCancion />} />

          {/* Protegemos la tabla principal */}
        <Route 
          path="/admin" 
          element={
            <RutaProtegida usuarioLogueado={usuarioLogueado}>
              <Admin />
            </RutaProtegida>
          } 
        />

        {/* Protegemos el formulario de Crear */}
        <Route 
          path="/admin/crear" 
          element={
            <RutaProtegida usuarioLogueado={usuarioLogueado}>
              <FormularioCancion titulo="Crear Canción" />
            </RutaProtegida>
          } 
        />

        {/* Protegemos el formulario de Editar */}
        <Route 
          path="/admin/editar/:id" 
          element={
            <RutaProtegida usuarioLogueado={usuarioLogueado}>
              <FormularioCancion titulo="Editar Canción" />
            </RutaProtegida>
          } 
        />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;