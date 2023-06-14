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

export const productSchema = Joi.object({
  title: Joi.string().strict().required(),
  description: Joi.string().strict().required(),
  price: Joi.number().required(),
  image: Joi.string().uri().allow('image/png', 'image/jpeg').required(),
  inStock: Joi.number().required(),
  categories: Joi.array().min(1),
});
