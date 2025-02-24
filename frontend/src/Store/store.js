import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      // Variable local de usuarios (inicialmente vacía)
      usuarios: ["ejemplo"],
      usuariosStats: ["ejemplo2"],

      // Acción para agregar un nuevo usuario
      AgregarUsuarioStats: (usuarios) => set((state) => ({
        usuariosStats: [usuarios]
      })),
      AgregarUsuarios: (usuarios) => set((state) => ({
        usuarios: [usuarios]
      })),
    }),
    {
      name: 'usuarios-storage', // Clave para guardar el estado en localStorage
    }
  )
);