import { createContext, useContext, useState } from 'react';
import {
  solicitudCrearBoleta,
  solicitudListarBoletas,
  solicitudPerfilUsuario,
  solicitudListarPlantas,
  solicitudListarProductos,
  solicitudCerrarSesionUsuario,
  solicitudCerrarSesionAdm,
  listarUsuario,
  solicitudCrearProducto,
  solicitudCrearPlanta
} from "../api/task.js";


const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be within a TaskProvider");
  }

  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasksAccesorio = async () => {
    try {
      const res = await solicitudListarProductos();
      console.log(res);
      setTasks(res.data);
      return { success: true, data: res.data };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  };

  const getclientes = async () => {
    try {
      const res = await listarUsuario();
      console.log(res);
      setTasks(res.data);
      return { success: true, data: res.data };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  };

  const getTasksPlanta = async () => {
    try {
      const res = await solicitudListarPlantas();
      console.log(res);
      setTasks(res.data);
      return { success: true, data: res.data };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  };

  const getTasksboleta = async () => {
    try {
      const res = await solicitudListarBoletas();
      console.log(res);
      setTasks(res.data);
      return { success: true, data: res.data };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  };


  const createproducte = async (task) => {
    try {
      const res = await solicitudCrearProducto(task);
      console.log('Solicitud exitosa:', res.data);
      return { success: true, data: res.data };
    } catch (error) {
      console.error('Error en la solicitud:', error.response.data);
      return { success: false, error: error.response.data };
    }
  };

  const addplanta = async (task) => {
    try {
      const res = await   solicitudCrearPlanta(task);
      console.log('Solicitud exitosa:', res.data);
      return { success: true, data: res.data };
    } catch (error) {
      console.error('Error en la solicitud:', error.response.data);
      return { success: false, error: error.response.data };
    }
  };




  const createTaskboleta = async (task) => {
    try {
      const res = await solicitudCrearBoleta(task);
      console.log('Solicitud exitosa:', res.data);
      return { success: true, data: res.data };
    } catch (error) {
      console.error('Error en la solicitud:', error.response.data);
      return { success: false, error: error.response.data };
    }
  };

  const solicitudPerfilUser = async (correo) => {
    try {
      const res = await solicitudPerfilUsuario({ correo });
      console.log('Perfil de usuario:', res.data);
      return { success: true, data: res.data };
    } catch (error) {
      console.error('Error en la solicitud de perfil de usuario:', error.response.data);
      return { success: false, error: error.response.data };
    }
  };


  const cerrarSesionUsuario = async () => {
    try {
      const res = await solicitudCerrarSesionUsuario();
      console.log('Sesión cerrada exitosamente:', res.data);
      return { success: true, data: res.data };
    } catch (error) {
      console.error('Error al cerrar sesión:', error.response.data);
      return { success: false, error: error.response.data };
    }
  };
  const cerrarSesionAdministracion = async () => {
    try {
      // Utiliza solicitudCerrarSesionAdm en lugar de solicitudInicioSesionAdm
      const res = await solicitudCerrarSesionAdm();
      console.log('Sesión cerrada exitosamente:', res.data);
      return { success: true, data: res.data };
    } catch (error) {
      console.error('Error al cerrar sesión:', error.response.data);
      return { success: false, error: error.response.data };
    }
  };
  

  


  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        createTaskboleta,
        getTasksboleta,
        solicitudPerfilUser,
        getTasksPlanta,
        getTasksAccesorio,
        cerrarSesionAdministracion,
        cerrarSesionUsuario,
        getclientes,
        createproducte,
        addplanta
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

