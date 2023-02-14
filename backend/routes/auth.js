import express from 'express';
import * as authController from '../controllers/auth.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/isAuthenticated', authController.isAuthenticated);

export default router;
