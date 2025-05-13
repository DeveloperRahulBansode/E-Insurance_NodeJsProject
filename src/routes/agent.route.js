import express from 'express';
import * as agentController from '../controllers/agent.controller';
import { newAgentValidator } from '../validators/agent.validator';

const router = express.Router();

//route to create a new agent
router.post('',newAgentValidator, agentController.newAgent);

//route to login a agent
router.post('/login', agentController.agentLogin);

//refresh token
router.post('/token/refresh', agentController.refreshToken);

//route for forgot password
router.post('/forget', agentController.agentForgotPassword);

//route for reset password
router.post('/reset', agentController.agentResetPassword);




export default router;