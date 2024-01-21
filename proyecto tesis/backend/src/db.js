import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin:nicolas1@cluster0.o0is4xz.mongodb.net/?retryWrites=true&w=majority");
        console.log("Conexión a MongoDB establecida correctamente");
    } catch (error) {
        console.error("Error de conexión a MongoDB:", error.message);
    }
};



