import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Autchcontext";
import { Link } from "react-router-dom";

function RegisterPage() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const { signupuser } = useAuth();

  const onSubmit = async (values) => {
    try {
      await signupuser(values);

      // Manejar respuestas exitosas
      setSuccessMessage("Usuario registrado exitosamente");

      // Puedes redirigir a otra página aquí si es necesario
    } catch (error) {
      // Manejar errores de respuesta
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          setError("contraseña", { type: "manual", message: data.message });
        } else {
          console.error(`Error del servidor: ${status}`);
        }
      } else {
        console.error("Error de red:", error.message);
      }
    }
  };

  return (
    <div className="bg-lime-600 h-screen flex justify-center items-center">
      <form
        className="bg-neutral-300 p-8 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          {...register("Id_usuario", { required: false })}
          className="w-full p-4 py-2 rounded-md"
          placeholder="Id usuario"
        />
        <input
          type="text"
          {...register("nombre", { required: false })}
          className="w-full p-4 py-2 rounded-md"
          placeholder="Nombre"
        />
        <input
          type="text"
          {...register("apellido", { required: false })}
          className="w-full p-4 py-2 rounded-md"
          placeholder="Apellido"
        />
        <input
          type="email"
          {...register("correo", { required: false })}
          className="w-full p-4 py-2 rounded-md"
          placeholder="Correo"
        />
        <input
          type="password"
          {...register("contraseña", { required: false })}
          className="w-full p-4 py-2 rounded-md"
          placeholder="Contraseña"
        />
        {errors.contraseña && (
          <p className="text-red-500">{errors.contraseña.message}</p>
        )}
        {successMessage && (
          <p className="text-green-500">{successMessage}</p>
        )}
        <button
          type="submit"
          className="bg-lime-600 text-white p-2 rounded-md mt-4"
        >
          Register
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

export default RegisterPage;
