import Venta from "../models/venta.model.js";
import { v4 as uuidv4 } from 'uuid';

export const listarVentas = async (req, res) => {
    try {
        // Obtén el id del usuario autenticado desde el token
        const userId = req.user.id;

        // Busca las ventas que tienen el mismo id de usuario
        const ventas = await Venta.find({ id: userId });

        return res.json(ventas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const obtenerVentaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const venta = await Venta.findOne({ Id_venta: id });

        if (!venta) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }

        return res.json(venta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const crearVenta = async (req, res) => {
    try {
        const { Modo_pago, Total,  } = req.body;
        const userId=req.user.id

      

        const nuevaVenta = new Venta({
            Id_venta: uuidv4(),
            Modo_pago,
            Total,
            id: userId,
        });

        const ventaGuardada = await nuevaVenta.save();
        return res.status(201).json(ventaGuardada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const modificarVenta = async (req, res) => {
    const { id } = req.params;
    try {
        const ventaModificada = await Venta.findOneAndUpdate({ Id_venta: id }, req.body, { new: true });

        if (!ventaModificada) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }

        return res.json(ventaModificada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const eliminarVenta = async (req, res) => {
    const { id } = req.params;
    try {
        const ventaEliminada = await Venta.findOneAndDelete({ Id_venta: id });

        if (!ventaEliminada) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }

        return res.json({ mensaje: "Venta eliminada exitosamente", ventaEliminada });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
