import Producto from "../models/accesorio.model.js";
export const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        return res.json(productos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findOne({ id_accesorio: id });
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        return res.json(producto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const crearProducto = async (req, res) => {
    try {
        console.log(req.user)
        const { id_accesorio, nombre, descripcion, precio, stock } = req.body;
        // Verifica si todos los campos requeridos están presentes
        const camposRequeridos = ['id_accesorio', 'nombre', 'descripcion', 'precio', 'stock'];
        const faltanCampos = camposRequeridos.filter(campo => !req.body[campo]);
        if (faltanCampos.length > 0) {
            return res.status(400).json({ error: `Faltan los siguientes campos: ${faltanCampos.join(', ')}` });
        }
        // Crea un nuevo producto
        const nuevoProducto = new Producto({
            id_accesorio,
            nombre,
            descripcion,
            precio,
            stock,
        });
        // Guarda el nuevo producto en la base de datos
        const productoGuardado = await nuevoProducto.save();
        // Retorna la respuesta con el producto creado
        return res.status(201).json(productoGuardado);
    } catch (error) {
        console.error(error);
        // Manejo de errores: Puedes personalizar este mensaje de error según tus necesidades
        return res.status(500).json({ error: "Error al crear el producto" });
    }
};
export const modificarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const productoModificado = await Producto.findOneAndUpdate({ id_accesorio: id }, req.body, { new: true });
        if (!productoModificado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        return res.json(productoModificado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const productoEliminado = await Producto.findOneAndDelete({ id_accesorio: id });
        if (!productoEliminado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        return res.json({ mensaje: "Producto eliminado exitosamente", productoEliminado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
export const buscarProductoPorNombre = async (req, res) => {
    const { nombre } = req.params;
    try {
        const productos = await Producto.find({ nombre: { $regex: new RegExp(nombre, "i") } });
        return res.json(productos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};