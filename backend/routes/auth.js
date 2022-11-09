import express from 'express';
import * as authController from '../controllers/auth.js';

const router = express.Router();

router.post('/login', authController.logIn);
router.get('/loggedIn', authController.loggedIn);
router.get('/logout', authController.logOut);

export default router;
