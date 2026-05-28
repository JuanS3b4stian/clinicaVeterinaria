import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generateId from "../helpers/generateId.js";

// Schema -> Definir estructura y reglas de los documentos que voy a guardar MongoDB

const veterinarySchema = mongoose.Schema({ 
    name: {
        type: String,
        required: true, 
        trim: true
    },
    password: {
        type: String,
        required: true // Obligatorio
    },
    email: {
        type: String,
        required: true, // Obligatorio 
        unique: true,
        trim: true // Eliminar o limpiar espacios en blancos 
    },
    phone: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generateId,
        unique: true,
        trim: true
    },
    confirm: {
        type: Boolean,
        default: false
    }
});

veterinarySchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

veterinarySchema.methods.comparePassword = async function(passwordToCompare) {
    return bcrypt.compare(passwordToCompare, this.password);
};

const Veterinary = mongoose.model('Veterinary', veterinarySchema);
export default Veterinary;