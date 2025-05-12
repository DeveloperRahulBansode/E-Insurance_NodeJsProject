import express from 'express';
import * as agentController from '../controllers/agent.controller';
import { newAgentValidator } from '../validators/agent.validator';

const router = express.Router();

//route to create a new user
router.post('', newAgentValidator, agentController.newAgent);



export default router;