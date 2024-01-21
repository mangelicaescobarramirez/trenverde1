import mongoose from "mongoose";
const Schema = mongoose.Schema;
const accesorioSchema = new Schema({
    id_accesorio: { type: String, required: false, unique: true },  // Llave primaria
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
});
const Accesorio = mongoose.model("Accesorio", accesorioSchema);
export default Accesorio;