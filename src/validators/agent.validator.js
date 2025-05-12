import Joi from '@hapi/joi';
import { agent } from 'supertest';

export const newAgentValidator = (req, res, next) => {
  const schema = Joi.object({
    agentID: Joi.number().integer(),
    fullName: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    mobileNumber: Joi.string().min(3).required(),
    role: Joi.string().valid('agent').default('agent')
   
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
