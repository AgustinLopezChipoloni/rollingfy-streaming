import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./componets/NavBar";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Home from "./pages/Home";
import DetalleCancion from "./pages/DetalleCancion";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/" element={<Home />} />
        <Route path="/detalle/:id" element={<DetalleCancion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
