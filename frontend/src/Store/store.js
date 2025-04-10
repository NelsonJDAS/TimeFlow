import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  // persist(
    (set) => ({
      // Variable local de usuarios (inicialmente vacía)
      usuarios: {},
      usuariosStats: {},

      // Acción para agregar un nuevo usuario
      AgregarUsuarioStats: (usuarios) => set((state) => ({
        usuariosStats: usuarios
      })),
      AgregarUsuarios: (usuarios) => set((state) => ({
        usuarios: usuarios
      })),
      ExtraerFetch: () => set((state) => {
        fetch("http://ejemplo.com/api/usuario", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre: "Juan", edad: 31 }),
        })
        .then(response => response.json())
        .then(data => console.log("Usuario actualizado:", data))
        .catch(error => console.error("Error:", error));
      
        return state; // Devuelve el estado actual si no lo modificas
      }),
    }),
    {
      name: 'usuarios-storage', // Clave para guardar el estado en localStorage
    }
  // )
);