import Boleta from "../models/boleta.model.js";
import { v4 as uuidv4 } from 'uuid';
export const listarBoletas = async (req, res) => {
    try {
        // Obtén el id del usuario autenticado desde el token
        const userId = req.user.id;

        // Busca las boletas que tienen el mismo id de usuario
        const boletas = await Boleta.find({ id: userId });

        return res.json(boletas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const obtenerBoletaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const boleta = await Boleta.findOne({ Id_boleta: id });

        if (!boleta) {
            return res.status(404).json({ error: "Boleta no encontrada" });
        }

        return res.json(boleta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const crearBoleta = async (req, res) => {
    try {
        const { producto, total, Fecha_salida } = req.body;
        // Asegúrate de incluir Id_usuario en el objeto de la nueva boleta
        const userId = req.user.id;
        console.log('UserId:', userId);
        const nuevaBoleta = new Boleta({
            Id_boleta: uuidv4(), // Puedes cambiar esto según tus preferencias
            producto,
            total,
            Fecha_salida: Fecha_salida || new Date(), // Usa Fecha_salida proporcionada o la actual si no se proporciona
            id: userId // Deja userId como cadena si es una cadena, o conviértelo a ObjectId según sea necesario
        });
        const guardarBoleta = await nuevaBoleta.save();
        res.json(guardarBoleta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};
export const modificarBoleta = async (req, res) => {
    const { id } = req.params;
    try {
        const boletaModificada = await Boleta.findOneAndUpdate({ Id_boleta: id }, req.body, { new: true });

        if (!boletaModificada) {
            return res.status(404).json({ error: "Boleta no encontrada" });
        }

        return res.json(boletaModificada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const eliminarBoleta = async (req, res) => {
    const { id } = req.params;
    try {
        const boletaEliminada = await Boleta.findOneAndDelete({ Id_boleta: id });

        if (!boletaEliminada) {
            return res.status(404).json({ error: "Boleta no encontrada" });
        }

        return res.json({ mensaje: "Boleta eliminada exitosamente", boletaEliminada });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

