import express from 'express';
import * as policyController from '../controllers/policy.controller';
import { newPolicyValidator } from '../validators/policy.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { hasRole } from '../middlewares/role';

const router=express.Router();

//create policy
router.post('',userAuth,hasRole(['admin']),newPolicyValidator,policyController.createPolicy);



export default router;