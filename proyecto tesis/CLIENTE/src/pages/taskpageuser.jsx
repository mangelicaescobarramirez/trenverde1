import React, { useEffect, useState } from 'react';
import { useTask } from '../context/TasksContext';
import { Link } from 'react-router-dom';


function TaskPageUser() {
  const { getTasksboleta, tasks } = useTask();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [boletasLoaded, setBoletasLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!boletasLoaded) {
          await getTasksboleta();
          setBoletasLoaded(true);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Hubo un error al obtener las boletas.');
        setLoading(false);
      }
    };

    fetchData();
  }, [getTasksboleta, boletasLoaded]);

  return (
    <div className="container mx-auto mt-8 p-4 bg-white shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Tus Boletas</h1>
      {loading && <p className="text-gray-600">Cargando boletas...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {tasks && tasks.length > 0 ? (
        <ul>
          {tasks.map((boleta) => (
            <li key={boleta._id} className="mb-4">
              <div className="border-b border-gray-300 pb-2">
                <strong className="text-indigo-600">ID Boleta:</strong> {boleta.Id_boleta}<br />
                <strong className="text-indigo-600">Fecha Salida:</strong> {new Date(boleta.Fecha_salida).toLocaleString()}<br />
                <strong className="text-indigo-600">Producto:</strong> {boleta.producto}<br />
                <strong className="text-indigo-600">Total:</strong> {boleta.total}<br />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No se encontraron boletas.</p>
      )}


<div className="mb-4">
  <br></br>
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
    </div>
  );
}

export default TaskPageUser;

