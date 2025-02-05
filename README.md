# Plantilla Fullstack con React, Flask, SQLAlchemy, PostgreSQL, Tailwind CSS e i18n

Esta plantilla está diseñada para proyectos fullstack utilizando las siguientes tecnologías:

- **Frontend:** React (con Vite) + Tailwind CSS
- **Backend:** Flask (con SQLAlchemy y PostgreSQL)
- **Internacionalización:** i18n con soporte dinámico de traducciones

## Requisitos previos

- Node.js v16+ y npm
- Python 3.8+
- PostgreSQL instalado y en ejecución

---

## Estructura del proyecto

```
project-root/
├── backend/            # Backend con Flask y SQLAlchemy
│   ├── app/            # Código principal del backend
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── routes.py
│   ├── config.py       # Configuración del backend
│   └── wsgi.py         # Punto de entrada del backend
├── frontend/           # Frontend con React y Vite
│   ├── src/            # Código principal del frontend
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── i18n.js     # Configuración de i18n
│   └── vite.config.js  # Configuración de Vite
├── public/             # Recursos públicos del frontend
│   └── locales/        # Archivos de traducción i18n
├── Pipfile             # Archivo para manejar dependencias y scripts del backend
└── README.md           # Este archivo
```

---

## Configuración del proyecto

## Backend

1. Ve a la carpeta `backend`:
   ```bash
   cd backend
   ```

2. Instala las dependencias usando `pipenv`:
   ```bash
   pip install pipenv
   pipenv install
   ```

3. Configura tu conexión a la base de datos PostgreSQL en `config.py`:
   ```python
   SQLALCHEMY_DATABASE_URI = 'postgresql://<usuario>:<contraseña>@localhost:5432/<nombre_base_datos>'
   ```

4. Usa los scripts definidos en el `Pipfile` para ejecutar tareas comunes:

   - **Iniciar el servidor:**
     ```bash
     pipenv run start
     ```

   - **Crear migraciones:**
     ```bash
     pipenv run migrate
     ```

   - **Aplicar migraciones:**
     ```bash
     pipenv run upgrade
     ```

   - **Borrar todas las migraciones y datos de la base de datos:**
     ```bash
     pipenv run reset
     ```

El backend estará disponible en `http://127.0.0.1:5000`.
La base de datos estará disponible en `http://127.0.0.1:5000/admin`

---

### Migraciones en el backend.

Flask-Migrate se utiliza para manejar cambios en los modelos y reflejarlos en la base de datos. Sigue estos pasos:

1. **Crear una migración:**
   ```bash
   pipenv run migrate
   ```
   Esto genera un archivo en la carpeta `migrations/versions` que describe los cambios realizados.

2. **Aplicar la migración a la base de datos:**
   ```bash
   pipenv run upgrade
   ```
   Esto actualizará la base de datos con los cambios definidos en los modelos.

3. **Reiniciar las migraciones (en desarrollo):**
   Si necesitas borrar todas las migraciones y reiniciar:
   ```bash
   pipenv run reset
   ```
   Esto elimina la carpeta `migrations` y limpia la base de datos.

---

### Endpoints del backend

### Ejemplo: Obtener mensaje de bienvenida

- **Ruta:** `GET /ms`
- **Descripción:** Devuelve un mensaje de bienvenida.
- **Respuesta:**
  ```json
  {
      "message": "Welcome to the Flask API"
  }
  ```

---

### Instalación de PostgreSQL

1. **Descargar e instalar PostgreSQL:**
   - Ve a la página oficial de PostgreSQL: [https://www.postgresql.org/download/](https://www.postgresql.org/download/).
   - Descarga la versión correspondiente a tu sistema operativo (Windows, macOS, Linux).
   - Sigue el asistente de instalación. Durante el proceso, asegúrate de:
     - Configurar un usuario administrador (generalmente `postgres`).
     - Recordar la contraseña que configuraste.
     - Mantener el puerto predeterminado (`5432`), salvo que necesites cambiarlo.

2. **Verificar que PostgreSQL está corriendo:**
   - En **Windows**:
     - Abre el Administrador de Servicios (`services.msc`) y asegúrate de que el servicio `PostgreSQL` esté iniciado.
   - En **Linux/Mac:**
     ```bash
     sudo systemctl status postgresql
     ```

3. **Conectarte a PostgreSQL:**
   - Usa la herramienta `psql` para conectarte al servidor:
     ```bash
     psql -U postgres
     ```
   - Si se te solicita una contraseña, ingresa la configurada durante la instalación.

4. **Crear una base de datos:**
   - Dentro del cliente `psql`, ejecuta:
     ```sql
     CREATE DATABASE <nombre_base_datos>;
     ```
   - Reemplaza `<nombre_base_datos>` con el nombre que desees para tu base de datos.

5. **Probar la conexión desde el backend:**
   - Asegúrate de que el archivo `config.py` contiene las credenciales correctas.
   - Reinicia el backend y verifica que no hay errores de conexión.

---

## Frontend

1. Ve a la carpeta `front`:
   ```bash
   cd front
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

El frontend estará disponible en `http://localhost:5173`.

---

## Internacionalización (i18n)

La internacionalización está configurada para cargar archivos JSON desde la carpeta `public/locales`. La estructura es la siguiente:

```
public/
└── locales/
    ├── en/
    │   ├── common.json
    │   ├── footer.json
    ├── es/
    │   ├── common.json
    │   ├── footer.json
```

### Agregar traducciones

1. Crea o edita los archivos JSON en los idiomas deseados.

2. Cada archivo puede representar un namespace (por ejemplo, `common`, `footer`).

### Usar traducciones en componentes

Utiliza el hook `useTranslation` de `react-i18next` en tus componentes. Ejemplo:

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <h1>{t('welcome')}</h1>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('es')}>Español</button>
        </div>
    );
};

export default Home;
```

---

## Tailwind CSS

Tailwind CSS está configurado y listo para usar. Para agregar estilos:

1. Edita `src/index.css` para agregar las directivas de Tailwind:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. Usa clases utilitarias directamente en tus componentes React:
   ```jsx
   <div className="bg-blue-500 text-white p-4">
       Hola, Tailwind CSS!
   </div>
   ```

---

## Notas finales

- Asegúrate de que tu servidor de base de datos PostgreSQL esté en ejecución.
- Usa `npm run build` para generar la versión de producción del frontend.
- Si necesitas más personalización, ¡no dudes en adaptarlo a tus necesidades!
