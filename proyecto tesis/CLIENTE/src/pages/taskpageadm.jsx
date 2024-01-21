import React, { useEffect, useState } from 'react';
import { useTask } from '../context/TasksContext';

function Taskspageadm() {
  const { getclientes, tasks } = useTask();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientesLoaded, setClientesLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!clientesLoaded) {
          await getclientes();
          setClientesLoaded(true);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Hubo un error al obtener los clientes.');
        setLoading(false);
      }
    };

    fetchData();
  }, [getclientes, clientesLoaded]);

  return (
    <div className="container mx-auto mt-8 p-4 bg-white shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>
      {loading && <p className="text-gray-600">Cargando clientes...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {tasks && tasks.length > 0 ? (
        <ul>
          {tasks.map((cliente) => (
            <li key={cliente._id} className="mb-4">
              <div className="border-b border-gray-300 pb-2">
                <strong className="text-indigo-600">ID Cliente:</strong> {cliente._id}<br />
                <strong className="text-indigo-600">Nombre:</strong> {cliente.nombre || 'N/A'}<br />
                {/* Agrega más detalles del cliente según sea necesario */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No se encontraron clientes.</p>
      )}
    </div>
  );
}

export default Taskspageadm;
