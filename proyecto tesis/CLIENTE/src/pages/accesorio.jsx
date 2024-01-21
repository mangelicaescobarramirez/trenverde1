import React, { useEffect, useState } from 'react';
import { useTask } from '../context/TasksContext';
import { Link } from 'react-router-dom';


function AccesoriosPage() {
  const { getTasksAccesorio, tasks } = useTask();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accesoriosLoaded, setAccesoriosLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accesoriosLoaded) {
          await getTasksAccesorio();
          setAccesoriosLoaded(true);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Hubo un error al obtener los accesorios.');
        setLoading(false);
      }
    };

    fetchData();
  }, [getTasksAccesorio, accesoriosLoaded]);

  return (
    <div className="container mx-auto mt-8 p-4 bg-white shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Accesorios</h1>
      {loading && <p className="text-gray-600">Cargando accesorios...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {tasks && tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="mb-4">
              <div className="border-b border-gray-300 pb-2">
                <strong className="text-indigo-600">ID Accesorio:</strong> {task.id_accesorio}<br />
                <strong className="text-indigo-600">Nombre:</strong> {task.nombre}<br />
                <strong className="text-indigo-600">Descripción:</strong> {task.descripcion || 'N/A'}<br />
                <strong className="text-indigo-600">Precio:</strong> {task.precio || 'N/A'}<br />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No se encontraron accesorios.</p>
      )}


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

        <Link
  className="bg-lime-600 text-white px-4 py-2 rounded-md mt-4 inline-block font-bold "
  to="/Profileuser"
  style={{ marginLeft: '200px' }}
>
        Perfil Cliente


</Link>

<Link
  className="bg-lime-600 text-white px-4 py-2 rounded-md mt-4 inline-block font-bold "
  to="/Profileadm"
  style={{ marginLeft: '200px' }}
>
        Perfil Administración


</Link>


    </div>

    
  );
}

export default AccesoriosPage;
