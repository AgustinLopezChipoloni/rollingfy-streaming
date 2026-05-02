import { useState } from "react";
import NavBar from "./componets/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/Home";
import DetalleCancion from "./pages/DetalleCancion";
import Footer from './componets/Footer';

function App() {
  return (
      <AuthProvider>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/" element={<Home />} />
        <Route path="/detalle/:id" element={<DetalleCancion />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
