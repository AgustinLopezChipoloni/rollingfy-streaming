import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioKey'));

    if (usuarioGuardado) {
      setUsuarioLogueado(usuarioGuardado);
    }
  }, []);

  const login = (usuario) => {
    localStorage.setItem('usuarioKey', JSON.stringify(usuario));
    setUsuarioLogueado(usuario);
  };

  const logout = () => {
    localStorage.removeItem('usuarioKey');
    setUsuarioLogueado(null);
  };

  return (
    <AuthContext.Provider value={{ usuarioLogueado, setUsuarioLogueado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};