# Task Manager

Aplicación web desarrollada con **Next.js** para la gestión de tareas y subtareas, con un diseño responsive y organizado en componentes reutilizables.

## 🚀 Características

- 📋 **Listado de tareas** con tarjetas (`TaskCard`) organizadas en un layout de 4 columnas.
- ➕ **Formulario de creación** de tareas (`TaskForm`) que se muestra/oculta con toggle.
- 🖊 **Edición de tareas** desde la vista de detalle (`/tasks/[id]`).
- 🗑 **Eliminación de tareas** con confirmación.
- ✅ **Subtareas** asociadas a una tarea principal, con formulario desplegable.
- 🎨 **Estilos responsivos** usando módulos CSS (`.module.css`) para mantener el aislamiento de estilos.
- 🖥 **Navbar y Sidebar** persistentes en todas las vistas principales.

---

## 📦 Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v16 o superior
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

---

## ⚙️ Instalación

1. **Clonar el repositorio**:

```bash
git clone https://github.com/lucasmzd/taskSystem
cd task-manager

Instalar dependencias:

npm install

Para levantar el servidor de desarrollo:

npm run dev

La aplicación estará disponible en: http://localhost:3000

Compilación para producción

npm run build

npm start

Lucas Muñoz.