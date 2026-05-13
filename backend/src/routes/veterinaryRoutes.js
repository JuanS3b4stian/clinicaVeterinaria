// Routes

import express from 'express';
const router = express.Router();
import { register, login, confirm, profile } from '../controllers/veterinaryController.js';

router.post('/register', register);

router.post('/login', login);

router.get('/confirm/:token', confirm);

router.get('/profile', profile);

export default router;