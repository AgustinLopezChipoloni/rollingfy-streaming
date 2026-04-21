# 🎵 Rollingfy - Music Streaming App

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![LocalStorage](https://img.shields.io/badge/LocalStorage-FFCA28?style=for-the-badge&logo=google-chrome&logoColor=black)

**Rollingfy** es una plataforma de administración y reproducción de música desarrollada como proyecto integrador para **RollingCode School**. La aplicación permite a los usuarios descubrir canciones, gestionar sus propias playlists y ofrece un panel de administración completo para la gestión del catálogo.

---

## 🚀 Características Principales

### 👤 Perfil Usuario / Invitado
- [cite_start]**Exploración de Catálogo:** Buscador dinámico por nombre de canción o artista[cite: 26].
- [cite_start]**Reproducción Sincronizada:** Reproductor fijo que permite visualizar la información de la canción actual[cite: 27].
- [cite_start]**Playlists Personales:** Los usuarios logueados pueden gestionar su lista de reproducción (agregar/eliminar canciones)[cite: 30].
- [cite_start]**Diseño Responsive:** Interfaz moderna inspirada en Spotify, adaptada a dispositivos móviles[cite: 22].

### 🛠️ Perfil Administrador
- [cite_start]**Panel CRUD:** Interfaz completa para crear, leer, editar y eliminar canciones del catálogo[cite: 32].
- [cite_start]**Gestión de Usuarios:** Visualización y control de cuentas registradas[cite: 33].
- [cite_start]**Rutas Protegidas:** Sistema de seguridad que impide el acceso no autorizado al panel administrativo[cite: 34].

---

## 🛠️ Tecnologías Utilizadas

- [cite_start]**Frontend:** React (Vite) [cite: 11]
- [cite_start]**Enrutamiento:** React Router DOM [cite: 15]
- **Estilos:** Bootstrap 5
- **Iconografía:** React Icons
- [cite_start]**Persistencia de Datos:** LocalStorage & SessionStorage [cite: 13, 14]

---

## 📂 Estructura del Proyecto

```text
src/
 ┣ 📂 assets/        # Recursos estáticos (imágenes, logos)
 ┣ 📂 components/    # Componentes reutilizables (Navbar, Player, FormAuth)
 [cite_start]┣ 📂 helpers/       # Lógica de LocalStorage y datos iniciales
 ┣ 📂 pages/         # Vistas principales (Home, Admin, Login, Playlist)
 ┣ App.jsx           # Configuración de rutas y estado global
 ┗ main.jsx          # Punto de entrada de la aplicación
