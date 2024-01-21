import Planta from "../models/planta.model.js";
export const listarPlantas = async (req, res) => {
    try {
        const plantas = await Planta.find();
        return res.json(plantas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const obtenerPlantaPorId = async (req, res) => {
    try {
       const planta = await Planta.findOne({ id_planta: req.params.id_planta });
 
       if (!planta) {
          return res.status(404).json({ message: 'No se encontró la planta' });
       }

       res.json(planta);
    } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Error interno del servidor' });
    }
 };
export const crearPlanta = async (req, res) => {
    try {
        // Ensure that the request body contains the required parameters
        const { id_planta, 
            nombre, 
            descripcion, 
            precio, 
            stock 
 } = req.body;
        // Validate that the required parameters are present
        if (!id_planta || !nombre ||!descripcion || !precio || !stock) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }
        const nuevaPlanta = new Planta({

            id_planta, 
            nombre, 
            descripcion, 
            precio, 
            stock 


        });
        const plantaGuardada = await nuevaPlanta.save();
        return res.status(201).json(plantaGuardada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const modificarPlanta = async (req, res) => {
    const { id_planta } = req.params;
    try {
        const plantaModificada = await Planta.findOneAndUpdate({ id_planta }, req.body, { new: true });
        if (!plantaModificada) {
            return res.status(404).json({ error: "Planta no encontrada" });
        }
        return res.json(plantaModificada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const eliminarPlanta = async (req, res) => {
    const { id_planta } = req.params;
    try {
        const plantaEliminada = await Planta.findOneAndRemove({ id_planta });
        if (!plantaEliminada) {
            return res.status(404).json({ error: "Planta no encontrada" });
        }
        return res.json({ mensaje: "Planta eliminada exitosamente", plantaEliminada });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};