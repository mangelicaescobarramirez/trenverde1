// RegisterAdmin.jsx
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Autchcontext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { Link } from "react-router-dom";

function RegisterAdmin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signinadm } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Inicializa useNavigate

  const onSubmit = async (data) => {
    try {
      // Clear previous error and success messages
      setSuccessMessage("");

      // Wait for signinadm to complete
      const response = await signinadm({
        correo: data.email,
        contrasena: data.password,
      });

      // Handle successful registration
      setSuccessMessage(response?.data?.message || "Successfully registered");

      // Redirect to Profileadm after successful login
      navigate("/Profileadm");

      // You may also perform additional actions here
    } catch (error) {
      console.error("Registration error:", error);

      // Check if error.response and error.response.data exist
      if (error.response && error.response.data) {
        // Handle specific error messages if available
        setSuccessMessage(error.response.data.message || "Error in registration");
      } else {
        // Provide a generic error message if no specific message is available
        setSuccessMessage("Error in registration");
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
            <p className="text-red-500">Email is required</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className={`w-full p-4 py-2 rounded-md ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
        </div>

        {errors.generic && (
          <p className="text-red-500">{errors.generic.message}</p>
        )}

        {successMessage && (
          <p className="text-green-500">{successMessage}</p>
        )}

        <button
          type="submit"
          className="bg-lime-600 text-white p-2 rounded-md mt-4"
        >
          Ingresar 
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

export default RegisterAdmin;

