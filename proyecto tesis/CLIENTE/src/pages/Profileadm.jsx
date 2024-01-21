import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../context/TasksContext';

function Profileadm() {
  const { cerrarSesionAdministracion, user } = useTask();
  const [mensajeCierreSesion, setMensajeCierreSesion] = useState('');

  const handleCerrarSesion = async () => {
    try {
      // Llama a la función para cerrar sesión del administrador
      await cerrarSesionAdministracion();

      // Redirige a la página de inicio
      window.location.href = '/'; // This will reload the entire app

    } catch (error) {
      console.error('Error al cerrar sesión de administrador:', error);
      // Manejar el error si es necesario
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-500 text-white py-4 text-center">
        <h1 className="text-4xl font-bold">Perfil del Administrador</h1>
        {/* Muestra el correo del administrador si está autenticado */}
        {user && <p>{user.correo}</p>}
      </header>

      {/* Body */}
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Contenido del Perfil del Administrador</h2>
        {/* Contenido específico del perfil del administrador */}
        <p>
          ¡Bienvenido, Administrador!
          <br></br>
        </p>
         <br></br>
        {/* Enlaces para cambiar entre las páginas */}
        <div className="mb-4">
          <Link
            to="/taskspageadm"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Ver Clientes 
    
          </Link>
          
        </div>
        <br></br>

        <div className="mb-4">
          <Link
            to="/tasksformadm"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Agregar Producto
    
          </Link>
          
        </div>

        {/* Botón para cerrar sesión */}
        <div>
          <button
            onClick={handleCerrarSesion}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Cerrar Sesión
          </button>
        </div>

        <br></br>
        <div>
          <Link
            to="/UserCrud"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
          >
            Lista de plantas
          </Link>
        </div>
        <br></br>
        <div>
          <Link
            to="/accesorio"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
          >
            Ver Accesorios
          </Link>
        </div>

        <br></br>
        <div>
          <Link
            to="/agregarplanta"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
          >
           Agregar Planta
          </Link>
        </div>
<br></br>
        <Link

            to="/"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
          >
            IR A INICIO
          </Link>


    
        


        {/* Mensaje de cierre de sesión */}
        {mensajeCierreSesion && (
          <div className="text-red-500 mt-2">{mensajeCierreSesion}</div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 text-white text-center py-2 mt-4">
        <p>&copy; 2024 Tren Verde - Venta de Plantas</p>
      </footer>
    </div>
  );
}

export default Profileadm;
