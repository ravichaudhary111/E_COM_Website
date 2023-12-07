import express from 'express';
import UserController from '../controller/userController';
import { authMiddleware } from '../middlewares/authMiddleware/authMiddleware';

import {
    userRegisterValidationMiddleware,
    userLoginValidationMiddleware,
}
    from '../middlewares/validationsMiddleware/userValidation';

const router = express.Router();
const userController = new UserController();

router
    .post('/registerUser',
        userRegisterValidationMiddleware,
        userController.registerUser);

router
    .post('/login',
        userLoginValidationMiddleware,
        userController.loginUser);


export default router;
