import { useForm } from "react-hook-form";
import { useAuth } from "../context/Autchcontext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { Link } from "react-router-dom";

function UsuarioLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signinuser } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Inicializa useNavigate

  const onSubmit = async (data) => {
    try {
      // Limpia los mensajes de error y éxito anteriores
      setSuccessMessage("");

      // Espera a que signinuser se complete
      const response = await signinuser({
        correo: data.email,
        contraseña: data.password,
      });

      // Maneja el inicio de sesión exitoso
      setSuccessMessage(response?.data?.message || "Log in exitoso ");

      // Redirige al usuario a la ruta deseada tras el inicio de sesión exitoso
      navigate("/Profileuser");

      // También puedes realizar acciones adicionales aquí
    } catch (error) {
      console.error("Error de inicio de sesión:", error);

      // Verifica si error.response y error.response.data existen
      if (error.response && error.response.data) {
        // Maneja mensajes de error específicos si están disponibles
        setErrorMessage(error.response.data.message || "Error en el inicio de sesión");
      } else {
        // Proporciona un mensaje de error genérico si no hay un mensaje específico disponible
        setErrorMessage("Error en el inicio de sesión");
      }
    }
  };

  return (
    <div className="bg-lime-600 h-screen flex flex-col justify-center items-center">
      <div className="text-white text-center mb-4">
        <p>Esta es la página de inicio de sesión de usuario.</p>
      </div>
      <form
        className="bg-neutral-300 p-8 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className={`w-full p-4 py-2 rounded-md ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500">El correo electrónico es obligatorio</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className={`w-full p-4 py-2 rounded-md ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500">La contraseña es obligatoria</p>
          )}
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
          Entrar
        </button>

        <Link
            to="/"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
          >
            IR A INICIO
          </Link>

      </form>
    </div>
  );
}

export default UsuarioLogin;

