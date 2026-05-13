import Veterinary from '../models/Veterinary.js';

const register = async (req, res) => {
    try {
       const veterinary = new Veterinary(req.body);
       const veterinarySaved = await veterinary.save();
       return res.status(201).json({ msg: 'Usuario Registrado Correctamente', veterinarySaved });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al registrar usuario' });
    }
};

const login = (req, res) => {
    const { email, password } = req.body;
    res.json({ msg: 'Desde API/veterinarios/login'});
};

const confirm = async (req, res) => {
    const { token } = req.params;
    const userConfirm = await Veterinary.findOne({ token });

    if (!userConfirm) {
        const error = new Error('Token no válido');
        return res.status(404).json({ msg: error.message });
    }

    try {
        userConfirm.token = null;
        userConfirm.confirm = true;
        await userConfirm.save();
        res.json({msg: 'Cuenta confirmada....'})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al confirmar cuenta' });
    }}

const profile = (req, res) => {
    res.json({ msg: 'Desde API/veterinarios/profile' });
};

export {
    register,
    login,
    confirm,
    profile
};