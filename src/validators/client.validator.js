import Joi from '@hapi/joi';

export const newClientValidator = (req, res, next) => {
  const schema = Joi.object({
    clientID: Joi.number().integer(),
    fullName: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    mobileNumber: Joi.string().min(3).required(),
    role: Joi.string().valid('client').default('client')
   
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
