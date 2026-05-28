// Routes

import express from 'express';
const router = express.Router();
import { register, authenticate, confirm, forgetPassword, checkedToken, newPassword, profile } from '../controllers/veterinaryController.js';
import { checkAuth } from '../middlewares/authMiddleware.js';

router.post('/register', register);

router.post('/login', authenticate);

router.get('/confirm/:token', confirm);

router.post('/forget-password', forgetPassword);

router.get('/forget-password/:token', checkedToken);

router.post('/forget-password/:token', newPassword);

router.get('/profile', checkAuth, profile);

export default router;