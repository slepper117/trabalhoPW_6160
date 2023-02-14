import express from 'express';
import checkID from '../middleware/checkID.js';
import checkAuth from '../middleware/checkAuth.js';
import * as userController from '../controllers/user.js';

const router = express.Router();

router.get('/', checkAuth, userController.listUsers);
router.post('/', checkAuth, userController.createUser);
router.get('/:id', checkAuth, checkID('users'), userController.readUser);
router.put('/:id', checkAuth, checkID('users'), userController.updateUser);
router.delete('/:id', checkAuth, checkID('users'), userController.deleteUser);

export default router;
