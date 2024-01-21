import React, { useState } from 'react';
import { useTask } from '../context/TasksContext';
import { Link } from 'react-router-dom';

function Tasksformadm() {
  const { createproducte } = useTask();
  const [producto, setProducto] = useState({
    id_accesorio: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
  });
  const [registroExitoso, setRegistroExitoso] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await createproducte(producto);

    if (result.success) {
      // Manejar éxito, por ejemplo, redirigir a otra página
      console.log('Producto creado exitosamente:', result.data);
      setRegistroExitoso('Registro exitoso');
    } else {
      // Manejar error
      console.error('Error al crear el producto:', result.error);
      setRegistroExitoso('Error al crear el producto');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_accesorio">
            ID Accesorio:
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded"
            type="text"
            id="id_accesorio"
            name="id_accesorio"
            value={producto.id_accesorio}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre:
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded"
            type="text"
            id="nombre"
            name="nombre"
            value={producto.nombre}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
            Descripción:
          </label>
          <textarea
            className="w-full border border-gray-300 p-2 rounded"
            id="descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
            Precio:
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded"
            type="text"
            id="precio"
            name="precio"
            value={producto.precio}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
            Stock:
          </label>
          <input
            className="w-full border border-gray-300 p-2 rounded"
            type="text"
            id="stock"
            name="stock"
            value={producto.stock}
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            type="submit"
          >
            Crear Producto
          </button>
        </div>

        <Link
  className="bg-lime-600 text-white px-4 py-2 rounded-md mt-4 inline-block font-bold "
  to="/Profileadm"
  style={{ marginLeft: '200px' }}
>
        Perfil Administración


</Link>




      </form>

      {registroExitoso !== null && (
        <div className={`mt-4 ${registroExitoso === 'Registro exitoso' ? 'text-green-600' : 'text-red-600'}`}>
          {registroExitoso}
        </div>
      )}
    </div>
  );
}

export default Tasksformadm;
