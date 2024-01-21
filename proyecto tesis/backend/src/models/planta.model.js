import mongoose from "mongoose";
const Schema = mongoose.Schema;
const plantaSchema = new Schema({
    id_planta: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
});
const Planta = mongoose.model("Planta", plantaSchema);
export default Planta;
