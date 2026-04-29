import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import NavBar from "./componets/NavBar"
import Login from "./pages/Login"
import Registro from "./pages/Registro"
function App() {
  
  return (
    <BrowserRouter>
      <NavBar />              
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Registro" element={<Registro/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
