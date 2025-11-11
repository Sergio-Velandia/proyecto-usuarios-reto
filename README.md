#  Proyecto Integrado Full-Stack: Gestión de Usuarios y Autenticación

##  1. Objetivo del Proyecto

El objetivo principal de este proyecto es implementar una aplicación web completa y robusta, que sirva como una plataforma de gestión interna de usuarios para una empresa ficticia.

La aplicación integra tres componentes clave:
1.  **Frontend (React):** Interfaz de usuario (UI) moderna y reactiva.
2.  **Backend (Node.js/Express):** API RESTful para la lógica de negocio.
3.  **Base de Datos (MySQL):** Persistencia de datos de usuarios.

Además, se implementa un módulo de **Autenticación (Login)** seguro, siguiendo el diseño de identidad visual de la empresa.

---

##  2. Arquitectura de la Solución (MERN Stack Modificado)

La solución está construida sobre una arquitectura de tres capas:

| Componente | Tecnología | Rol |
| :--- | :--- | :--- |
| **Frontend** | React (Vite/CRA) + Router + Hooks | Renderiza la interfaz de usuario, gestiona el estado y realiza peticiones HTTP al Backend. |
| **Backend (API)** | Node.js + Express.js | Capa de lógica de negocio. Expone *endpoints* RESTful y gestiona la interacción con la base de datos. |
| **Base de Datos** | MySQL | Almacena la información de los usuarios y las credenciales de autenticación. |

---

##  3. Módulos y Funcionalidades

### 3.1. Módulo de Autenticación (Login)

Este módulo controla el acceso a la aplicación y garantiza la seguridad:
* **Login:** Permite el ingreso mediante credenciales.
* **Manejo de Sesión:** Implementación de **JSON Web Tokens (JWT)** para mantener el estado de autenticación de forma segura.
* **Rutas Protegidas:** Uso de *Middleware* para restringir el acceso a las rutas CRUD solo a usuarios autenticados.

### 3.2. Módulo CRUD (Gestión de Usuarios)

Panel de control para gestionar la base de datos de usuarios:

| Operación | Método HTTP | Endpoint | Descripción |
| :--- | :--- | :--- | :--- |
| **Create (Crear)** | `POST` | `/api/users` | Añadir un nuevo usuario. |
| **Read (Leer)** | `GET` | `/api/users` | Recuperar la lista completa de usuarios. |
| **Update (Actualizar)** | `PUT` | `/api/users/:id` | Modificar los datos de un usuario. |
| **Delete (Eliminar)** | `DELETE` | `/api/users/:id` | Eliminar un usuario. |

---

##  4. Configuración y Despliegue Local

### 4.1. Pre-requisitos

* **Node.js** (v18+) y **npm**.
* **MySQL Server** y un cliente de gestión (ej. MySQL Workbench).

### 4.2. Instalación del Backend

1.  Navegar a `/backend` e instalar dependencias: `npm install`
2.  **Configurar Base de Datos:**
    * Crear una base de datos MySQL (ej. `app_usuarios`).
    * Crear el archivo `.env` y definir las variables de conexión: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`, `JWT_SECRET`, `PORT=3001`.
3.  Iniciar el servidor: `npm start` (o `npm run dev`).

### 4.3. Instalación del Frontend

1.  Navegar a `/frontend` e instalar dependencias: `npm install`
2.  Asegurar la configuración del `VITE_API_URL` (ej. `http://localhost:3001/api`).
3.  Iniciar la aplicación React: `npm run dev`.


---

##  6. Contribuciones

* MATIAS RAMIREZ
* SERGIO RAMIREZ

