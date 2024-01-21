import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcrypt';
import { createAccessToken } from '../libs/jwt1.js';
import { TOKEN_SECRET1 } from "../config.js";
import jwt from 'jsonwebtoken'
export const registrarUsuario = async (req, res) => {
  const { Id_usuario, nombre, apellido, correo, contraseña } = req.body;
  const estado = "habilitado";  // Establecer el estado como "habilitado" por defecto

  try {
    // Verificar si falta algún campo requerido
    if (!Id_usuario || !nombre || !apellido || !correo || !contraseña) {
      return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }
      // Verificar si ya existe un usuario con el mismo correo
      const IdusuarioExistente = await Usuario.findOne({ Id_usuario });
      if (IdusuarioExistente) {
        return res.status(400).json({ message: 'Ya existe un usuario existente' });
    // Verificar si ya existe un usuario con el mismo correo
      }
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Ya existe un usuario con este correo.' });
    }
    // Validar la longitud y complejidad de la contraseña
    const contraseñaRegex = /^(?=.*\d).{6,}$/;
    if (!contraseñaRegex.test(contraseña)) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres y contener al menos un número.' });
    }

    // Validar la longitud del Id_usuario
    const idUsuarioRegex = /^[^\d]*$/;  // Expresión regular que permite cualquier carácter excepto números

    if (Id_usuario.length < 4 || !idUsuarioRegex.test(Id_usuario)) {
      return res.status(400).json({ message: 'El Id_usuario debe tener al menos 4 caracteres y no debe contener números.' });
    }

    // Hash de la contraseña antes de almacenarla en la base de datos
    const hashContraseña = await bcrypt.hash(contraseña, 10);

    // Crear una nueva instancia del modelo Usuario con los datos proporcionados
    const nuevoUsuario = new Usuario({
      Id_usuario,
      nombre,
      apellido,
      correo,
      contraseña: hashContraseña,
      estado,  // Asignar el estado directamente
    });

    // Guardar el nuevo usuario en la base de datos
    await nuevoUsuario.save();

    // Crear un token de acceso y guardarlo en una cookie
    const token = await createAccessToken({ id: nuevoUsuario.Id_usuario });
    res.cookie('token', token);

    // Responder con un mensaje indicando que el usuario ha sido registrado
    res.json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const iniciarSesionUsuario = async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    // Buscar al usuario por su correo
    const usuarioEncontrado = await Usuario.findOne({ correo });
    if (!usuarioEncontrado) {
      return res.status(400).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar si el usuario está habilitado
    if (usuarioEncontrado.estado !== 'habilitado') {
      return res.status(400).json({ message: 'El usuario está deshabilitado. No se puede iniciar sesión.' });
    }

    // Comparar la contraseña proporcionada con la contraseña almacenada
    const coincidenContraseñas = await bcrypt.compare(contraseña, usuarioEncontrado.contraseña);
    if (!coincidenContraseñas) {
      return res.status(400).json({ message: 'Contraseña incorrecta.' });
    }

    // Crear un token de acceso y guardarlo en una cookie
    const token = await createAccessToken({ id: usuarioEncontrado.Id_usuario });
    res.cookie('token', token, {
      sameSite: 'none',
      secure: true,
      httpOnly:false
    });

    // Responder con un mensaje indicando que el usuario ha iniciado sesión
    res.json({ message: 'Usuario ha iniciado sesión exitosamente.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const cerrarSesionUsuario = (req, res) => {
    try {
      // Limpiar la cookie de token estableciendo una fecha de expiración en el pasado
      res.cookie('token', '', {
        expires: new Date(0),
      });
      // Responder con un estado 200 indicando que el usuario ha cerrado sesión exitosamente
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// Otros métodos y funciones relacionados con la gestión de usuarios pueden ser añadidos aquí
export const profileuser = async (req, res) => {
  const { correo } = req.body;
  try {
    const usuarioEncontrado = await Usuario.findOne({ correo });
    if (!usuarioEncontrado) {
      return res.status(400).json({ Message: "Usuario no encontrado" });
    }
    const userData = {
      id: usuarioEncontrado._id,
      Id_usuario: usuarioEncontrado.Id_usuario,
      nombre: usuarioEncontrado.nombre,
      apellido: usuarioEncontrado.apellido,
      correo: usuarioEncontrado.correo,
    };
    return res.status(200).json(userData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ Message: "Error interno del servidor" });
  }
};
export const profileuser1 = async (req, res, next) => {
  const { correo } = req.body;
  try {
    const usuarioEncontrado = await Usuario.findOne({ correo });
    if (!usuarioEncontrado) {
      return res.status(400).json({ Message: "Usuario no encontrado" });
    }
    req.userData = {
      id: usuarioEncontrado._id,
      Id_usuario: usuarioEncontrado.Id_usuario,
      nombre: usuarioEncontrado.nombre,
      apellido: usuarioEncontrado.apellido,
      correo: usuarioEncontrado.correo,
    };
    next(); // Llama al siguiente middleware o ruta
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ Message: "Error interno del servidor" });
  }
};


export const verifyToken1 = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET1, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await adm.findOne(Usuario.Id_usuario);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      Id_usuario: userFound.Id_usuario,
      correo: userFound.correo
    });
  });
};