import Veterinary from '../models/veterinary.js';
import generateId from '../helpers/generateId.js';
import generateJWT from '../helpers/generateJWT.js';
import sendEmail from '../helpers/sendEmail.js';

const register = async (req, res) => {
    try {
       const { email } = req.body;
       const veterinaryExists = await Veterinary.findOne({ email });

       if (veterinaryExists) {
            return res.status(400).json({ msg: 'El email ya está registrado' });
       }

       const veterinary = new Veterinary(req.body);
       veterinary.token = generateId();
       const veterinarySaved = await veterinary.save();

       await sendEmail({
            email: veterinarySaved.email,
            name: veterinarySaved.name,
            token: veterinarySaved.token,
            purpose: 'confirm'
       });

       const veterinaryPublic = veterinarySaved.toObject();
       delete veterinaryPublic.password;
       delete veterinaryPublic.token;

       return res.status(201).json({ msg: 'Usuario Registrado Correctamente', veterinary: veterinaryPublic });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al registrar usuario' });
    }
};

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    try {
        const veterinary = await Veterinary.findOne({ email });

        if (!veterinary) {
            return res.status(404).json({ msg: 'El usuario no existe' });
        }

        if (!veterinary.confirm) {
            return res.status(403).json({ msg: 'Tu cuenta no ha sido confirmada' });
        }

        const passwordCorrect = await veterinary.comparePassword(password);

        if (!passwordCorrect) {
            return res.status(403).json({ msg: 'La contraseña es incorrecta' });
        }

        const token = generateJWT(veterinary._id);

        return res.json({
            _id: veterinary._id,
            name: veterinary.name,
            email: veterinary.email,
            phone: veterinary.phone,
            web: veterinary.web,
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al autenticar usuario' });
    }
};

const confirm = async (req, res) => {
    const { token } = req.params;

    try {
        const userConfirm = await Veterinary.findOne({ token });

        if (!userConfirm) {
            return res.status(404).json({ msg: 'Token no válido' });
        }

        userConfirm.token = null;
        userConfirm.confirm = true;
        await userConfirm.save();

        return res.json({ msg: 'Cuenta confirmada correctamente' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al confirmar cuenta' });
    }}

const forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const veterinary = await Veterinary.findOne({ email });

        if (!veterinary) {
            return res.status(404).json({ msg: 'El usuario no existe' });
        }

        veterinary.token = generateId();
        await veterinary.save();

        await sendEmail({
            email: veterinary.email,
            name: veterinary.name,
            token: veterinary.token,
            purpose: 'reset'
        });

        return res.json({ msg: 'Hemos enviado un email con instrucciones para restablecer tu contraseña' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al solicitar restablecimiento de contraseña' });
    }
};

const checkedToken = async (req, res) => {
    const { token } = req.params;

    try {
        const veterinary = await Veterinary.findOne({ token });

        if (!veterinary) {
            return res.status(404).json({ msg: 'Token no válido' });
        }

        return res.json({ msg: 'Token válido' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al validar token' });
    }
};

const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const veterinary = await Veterinary.findOne({ token });

        if (!veterinary) {
            return res.status(404).json({ msg: 'Token no válido' });
        }

        veterinary.password = password;
        veterinary.token = null;
        await veterinary.save();

        return res.json({ msg: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al actualizar contraseña' });
    }
};

const profile = (req, res) => {
    return res.json(req.veterinary);
};

export {
    register,
    authenticate,
    confirm,
    forgetPassword,
    checkedToken,
    newPassword,
    profile
};