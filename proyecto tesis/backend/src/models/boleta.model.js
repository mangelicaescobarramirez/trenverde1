import mongoose from "mongoose";
const Schema = mongoose.Schema;
const boletaSchema = new Schema({
    Id_boleta: { type: String, required: true, unique: true }, // Auto-incrementing primary key
    id: { type: String, ref: 'Usuario', required: true },
    producto: { type: String, required: true },
    total: { type: Number, required: true },
    Fecha_salida: { type: Date, required: false },
});
const Boleta = mongoose.model("Boleta", boletaSchema);
export default Boleta;
