import jwt from 'jsonwebtoken';
import Veterinary from '../models/veterinary.js';

const checkAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(403).json({ msg: 'Token no válido' });
    }

    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const veterinary = await Veterinary.findById(decoded.id).select('-password -token -confirm');

        if (!veterinary) {
            return res.status(403).json({ msg: 'Token no válido' });
        }

        req.veterinary = veterinary;
        return next();
    } catch (error) {
        return res.status(403).json({ msg: 'Token no válido' });
    }
};

export { checkAuth };