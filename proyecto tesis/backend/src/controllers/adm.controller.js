import adm from '../models/administrador.model.js'
import bcrypt from 'bcrypt'
import {createAccessToken} from '../libs/jwt.js'
import Usuario from '../models/usuario.model.js';
import { TOKEN_SECRET } from "../config.js";
import jwt from 'jsonwebtoken'

export const registrar = async (req, res) => {
  const { Id_admin, nombre, correo, contrasena, rol } = req.body;

  try {

     // Check if a user with the same Id_admin already exists
     const usuarioExistenteIdAdmin = await adm.findOne({ Id_admin });
     if (usuarioExistenteIdAdmin) {
       return res.status(400).json({ message: 'Ya existe un usuario con este Id_admin.' });
     }
    // Check if a user with the same email already exists
    const usuarioExistenteCorreo = await adm.findOne({ correo });
    if (usuarioExistenteCorreo) {
      return res.status(400).json({ message: 'Ya existe un usuario con este correo.' });
    }

   

    // Validate the length and complexity of the password
    const contraseñaRegex = /^(?=.*\d).{6,}$/;
    if (!contraseñaRegex.test(contrasena)) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres y contener al menos un número.' });
    }

    // Validate the length and pattern of Id_admin
    const idAdminRegex = /^[^\d]*$/; // Regex allowing any character except numbers
    if (Id_admin.length < 4 || !idAdminRegex.test(Id_admin)) {
      return res.status(400).json({ message: 'El Id_admin debe tener al menos 4 caracteres y no debe contener números.' });
    }

    // Hash the password before saving it to the database
    const passhash = await bcrypt.hash(contrasena, 10);

    // Create a new admin instance
    const newAdm = new adm({
      Id_admin,
      nombre,
      correo,
      contrasena: passhash,
      rol,
    });

    // Save the new admin to the database
    const admSaved = await newAdm.save();

    // Create an access token for the new admin
    const token = await createAccessToken({ id: admSaved.Id_admin });

    // Set the access token as a cookie (adjust this according to your authentication strategy)
    res.cookie('token', token);

    // Respond with a success message
    res.json({ message: 'Usuario creado exitosamente', token });
  } catch (error) {
    // Handle other errors
    res.status(500).json({ message: error.message });
  }
};

export const logearse = async(req,res) => {
    const {correo, contrasena  } = req.body
    try { 
       const admFound=  await adm.findOne({correo})
       if (!admFound) return res.status(400).json ({message:"Usuario no encontrado"});

       const isMatch = await bcrypt.compare (contrasena, admFound.contrasena);

       if(!isMatch) return res.status(400).json({message:"Contraseña incorrecta"})

        const token = await createAccessToken({id: admFound.Id_admin
        })
        res.cookie ('token', token, {
          sameSite: 'none',
          secure: true,
          httpOnly: false
        });
        res.json({
            message: "Usuario logeado",
            Id_admin: admFound.Id_admin,

        });
    } catch (error) {
       res.status(500).json({message: error.message});
    }
};



export const logout = (req, res) => {
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








export const profileadm = async (req, res) => {
    const { correo } = req.body;  // Extraer el correo de req.body
  
    try {
      const admFound = await adm.findOne({ correo });
  
      if (!admFound) {
        return res.status(400).json({ Message: "Administrador no encontrado" });
      }
  
      return res.json({
        id: admFound._id,
        Id_admin: admFound.Id_admin,
        nombre: admFound.nombre,
        correo: admFound.correo
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ Message: "Error interno del servidor" });
    }
  };


  import Boleta from '../models/boleta.model.js';
import Venta from '../models/venta.model.js';

export const listarBoletasadm = async (req, res) => {
    try {
        // Obtener todas las boletas
        const boletas = await Boleta.find();

        // Devolver las boletas como respuesta
        return res.json(boletas);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const listarVentasadm = async (req, res) => {
    try {
        // Obtener todas las ventas
        const ventas = await Venta.find();

        // Devolver las ventas como respuesta
        return res.json(ventas);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
// usuarioControlador.js


export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    res.status(500).json({ message: error.message });
  }
};

export const habilitarUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const usuario = await Usuario.findOneAndUpdate(
      { Id_usuario: idUsuario },  // Asegúrate de cambiar al nombre correcto del campo
      { estado: 'habilitado' },
      { new: true }
    );

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json({ message: 'Usuario habilitado exitosamente.', usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deshabilitarUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    const usuario = await Usuario.findOneAndUpdate(
      { Id_usuario: idUsuario },  // Cambiar al nombre del campo correspondiente
      { estado: 'deshabilitado' },
      { new: true }
    );

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json({ message: 'Usuario deshabilitado exitosamente.', usuario });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await adm.findOne(adm.Id_admin);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      Id_admin: userFound.Id_admin,
      correo: userFound.correo
    });
  });
};