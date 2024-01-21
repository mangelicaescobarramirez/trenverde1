// En tu componente Profileuser.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../context/TasksContext';

function Profileuser() {
  const { cerrarSesionUsuario, user } = useTask();

  const handleCerrarSesion = async () => {
    // Llama a la función para cerrar sesión
    const result = await cerrarSesionUsuario();

    // Redirige a la página de inicio si el cierre de sesión es exitoso
    if (result.success) {
      window.location.href = '/'; // Puedes usar history.push('/') de react-router-dom también
    }
    // Puedes manejar errores aquí si lo deseas
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-green-500 text-white py-4 text-center">
        <h1 className="text-4xl font-bold">Tren Verde - Venta de Plantas</h1>
        {/* Muestra el correo del usuario si está autenticado */}
        {user && <p>{user.correo}</p>}
      </header>

      {/* Body */}
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Perfil del Usuario</h2>
        {/* Contenido específico del perfil del usuario */}
        {/* Puedes agregar más contenido aquí según tus necesidades */}

        {/* Enlaces para cambiar entre las páginas */}
        <div className="mb-4">
          <Link
            to="/tasksformuser"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Hacer pedido de compras
          </Link>
        </div>
        <div className="mb-4">
          <Link
            to="/taskspageuser"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Ver tus compras
          </Link>
        </div>
        <div>
          <Link
            to="/"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
          >
            IR A INICIO
          </Link>
        </div>
        <br />
        <div>
          <Link
            to="/UserCrud"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
          >
            Lista de plantas
          </Link>
        </div>

        <br />
        <div>
          <Link
            to="/accesorio"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
          >
            Ver Accesorios
          </Link>
        </div>

        {/* Botón para cerrar sesión */}
        <div>
          <br />
          <button
            onClick={handleCerrarSesion}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Cerrar Sesión
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-500 text-white text-center py-2 mt-4">
        <p>&copy; 2024 Tren Verde - Venta de Plantas</p>
      </footer>
    </div>
  );
}

export default Profileuser;
