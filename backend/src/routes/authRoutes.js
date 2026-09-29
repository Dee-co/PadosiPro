import express from 'express';
import { login, logout, refreshToken, register, resendOtp, verifyOtp } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/register', register);
router.post('/verify-otp',verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/login',login);
router.post('/refresh',refreshToken);
router.post('/logout', authMiddleware, logout)
export default router;