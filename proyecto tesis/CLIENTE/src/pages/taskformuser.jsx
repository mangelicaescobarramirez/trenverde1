import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTask } from '../context/TasksContext';
import { Link } from 'react-router-dom';

export function Tasksformuser() {
  const { register, handleSubmit } = useForm();
  const { createTaskboleta, getTasksAccesorio, getTasksPlanta } = useTask();
  const [submitMessage, setSubmitMessage] = useState(null);

  const onSubmit = async (data) => {
    console.log('Datos enviados al backend:', data);

    const result = await createTaskboleta(data);

    if (result.success) {
      console.log('Solicitud exitosa:', result.data);
      setSubmitMessage('Solicitud exitosa');

      // Después de crear la boleta exitosamente, actualiza productos y plantas
      await getTasksAccesorio();
      await getTasksPlanta();
    } else {
      console.error('Error en la solicitud:', result.error);
      setSubmitMessage('Error en la solicitud');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label htmlFor="producto" className="block font-semibold text-gray-600">
          Producto:
        </label>
        <input
          type="text"
          id="producto"
          placeholder="Producto"
          {...register('producto', { required: 'Producto es requerido' })}
          autoFocus
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />

        <label htmlFor="total" className="block font-semibold text-gray-600">
          Total:
        </label>
        <input
          type="number"
          id="total"
          placeholder="Total"
          {...register('total', { required: 'Total es requerido' })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Crear Boleta
        </button>

        {submitMessage && (
          <p className={`text-${submitMessage.includes('exitosa') ? 'green' : 'red'}-500 mt-2`}>
            {submitMessage}
          </p>
        )}

<div className="mb-4">
      
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


      </form>
    </div>
  );
}

export default Tasksformuser;

