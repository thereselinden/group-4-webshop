import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(4).required(),
});

export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(4).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(4).required(),
});

export const deliveryAddressSchema = Joi.object({
  street: Joi.string().strict().required(),
  zipcode: Joi.string().strict().min(5).required(),
  city: Joi.string().strict().required(),
  country: Joi.string().strict().required(),
});
