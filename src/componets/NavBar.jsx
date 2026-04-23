import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaListUl, FaUserShield, FaSignInAlt } from "react-icons/fa";
const NavBar = () => {
  return (
    <>
 <>
  <nav className="navbar bg-dark">
    <div className="container-fluid d-flex align-items-center">
      <a className="navbar-brand d-flex align-items-center" href="#">
        <img   src="./src/assets/Logos_azul_y_rojo.jpg" alt="Logo" width="50" height="50" className="me-2"/> RollingFy
      </a>
      <form className="d-flex mx-auto" role="search" style={{ width: "100%", maxWidth: "400px" }}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      <div className="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
  <div className="p-4">
        <a className="nav-link" href="/login">Login</a>
        <a className="nav-link" href="/register">Register</a>
  </div>
</div>
     <div className="d-flex">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  </div>
      
    </div>
  </nav>
</>
    </>
  )
}

export default NavBar
