import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersController from '../controller/users.js'

const router = express.Router()
dotenv.config();
router.use(cors()); // Use CORS middleware

router.post('/',usersController.createUser);
router.put('/:user_id', usersController.updateUser);
router.delete('/:user_id',usersController.deleteUser);
router.get('/:user_id', usersController.getUserById);
router.post('/login',usersController.userLogin );

export default router