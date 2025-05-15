import Joi from '@hapi/joi';

export const newPolicyValidator = (req, res, next) => {
  const schema = Joi.object({
    policyID: Joi.number().integer().optional(),
    policyName: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).required(),
    policyType: Joi.string().valid('Health', 'Life', 'Vehicle', 'Travel').required(),
    premiumAmount: Joi.number().positive().required(),
    coverageAmount: Joi.number().positive().required(),
    durationInYears: Joi.number().integer().min(1).max(50).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
