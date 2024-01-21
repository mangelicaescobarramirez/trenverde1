import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Define the ventaSchema with modifications
const ventaSchema = new Schema({
  Id_venta: { type: String, unique: true },
  Modo_pago: { type: Number, required: true },
  Total: { type: Number, required: true },
  id: { type: String, ref: 'Usuario', required: true },
});
const Venta = mongoose.model("Venta", ventaSchema);
export default Venta;
