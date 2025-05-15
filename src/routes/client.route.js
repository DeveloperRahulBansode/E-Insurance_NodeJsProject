import express from 'express';
import * as clientController from '../controllers/client.controller';
import { newClientValidator } from '../validators/client.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { hasRole } from '../middlewares/role';

const router = express.Router();

//route to create a new user
router.post('',userAuth,hasRole(['agent']), newClientValidator,clientController.newClient);

//route to login a user
router.post('/login', clientController.clientLogin);

//refresh token
router.post('/token/refresh', clientController.refreshToken);

//route for forgot password
router.post('/forget', clientController.clientForgotPassword);

//route for reset password
router.post('/reset', clientController.clientResetPassword);

export default router;
