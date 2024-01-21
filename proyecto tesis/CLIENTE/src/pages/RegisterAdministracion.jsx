import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Autchcontext";
import { Link } from "react-router-dom";

function RegisterAdministracion() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const { signupadm } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (values) => {
    try {
      const response = await signupadm(values);

      // Clear previous error messages
      setErrorMessage("");

      // Handle successful registration
      setSuccessMessage("Registration successful"); // Adjust this line as needed

      // You may also redirect the user or perform additional actions here
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response && error.response.data && error.response.data.message) {
        // If the server provided an error message, display it
        setErrorMessage(error.response.data.message);
      } else {
        // If the error doesn't contain a specific message, display a generic error
        setErrorMessage("Error en el registro.");
      }
    }
  };

  return (
    <div className="bg-lime-600 h-screen flex justify-center items-center">
      <form
        className="bg-neutral-300 p-8 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="Id_admin">ID Administración:</label>
          <input
            type="text"
            {...register("Id_admin", { required: false })}
            className="w-full p-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            {...register("nombre", { required: false })}
            className="w-full p-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            {...register("correo", { required: false })}
            className="w-full p-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            {...register("contrasena", { required: true })}
            className="w-full p-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="rol">Rol:</label>
          <select
            {...register("rol", { required: false })}
            className="w-full p-4 py-2 rounded-md"
          >
            <option value="administrador">Administrador</option>
            <option value="vendedor">Vendedor</option>
          </select>
        </div>

        {errorMessage && (
          <p className="text-red-500">{errorMessage}</p>
        )}

        {successMessage && (
          <p className="text-green-500">{successMessage}</p>
        )}



        <button
          type="submit"
          className="bg-lime-600 text-white p-2 rounded-md mt-4"
        >
          Registro
        </button>


        <div>
  <br></br>
          <Link
            to="/"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
          >
            IR A INICIO
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterAdministracion;





