import express from 'express';
import * as adminController from '../controllers/admin.controller';
import { newAdminValidator } from '../validators/admin.validator';

const router = express.Router();

//route to create a new agent
router.post('',newAdminValidator, adminController.newAdmin);

//route to login a agent
router.post('/login', adminController.adminLogin);

//refresh token
router.post('/token/refresh', adminController.refreshToken);

//route for forgot password
router.post('/forget', adminController.adminForgotPassword);

//route for reset password
router.post('/reset', adminController.adminResetPassword);




export default router;