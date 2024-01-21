import React, { useEffect, useState } from 'react';
import { useTask } from '../context/TasksContext';
import { Link } from 'react-router-dom'; // Importa Link

function UserCrud() {
  const { getTasksPlanta, tasks } = useTask();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [plantasLoaded, setPlantasLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!plantasLoaded) {
          await getTasksPlanta();
          setPlantasLoaded(true);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Hubo un error al obtener las plantas.');
        setLoading(false);
      }
    };

    fetchData();
  }, [getTasksPlanta, plantasLoaded]);

  return (
    <div className="container mx-auto mt-8 p-4 bg-white shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Plantas</h1>
      {loading && <p className="text-gray-600">Cargando plantas...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {tasks && tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="mb-4">
              <div className="border-b border-gray-300 pb-2">
                <strong className="text-indigo-600">ID Planta:</strong> {task._id}<br />
                <strong className="text-indigo-600">Nombre:</strong> {task.nombre || 'N/A'}<br />
                <strong className="text-indigo-600">Precio:</strong> {task.precio || 'N/A'}<br />
                <strong className="text-indigo-600">Stock:</strong> {task.stock || 'N/A'}<br />
              </div>

              {/* Enlaces para cambiar entre las páginas */}
              <div className="mt-4">
                <Link
                  to="/tasksformuser"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 mr-2"
                >
                  Hacer pedido de compras
                </Link>
                <Link
                  to="/taskspageuser"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
                >
                  Ver tus compras
                </Link>



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
              
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No se encontraron plantas.</p>
      )}
    </div>
  );
}

export default UserCrud;
