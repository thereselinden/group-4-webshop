import Joi from 'joi';

const language = {
  'string.empty': `Kan inte vara ett tomt fält`,
  'string.email': `Ogiltig e-postadress`,
  'string.min': `Måste vara minst {#limit} tecken långt`,
  'string.uri': 'Måste vara en URI adress',
  'number.base': 'Måste vara ett nummer',
  'any.required': `Fältet är obligatoriskt`,
};

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages(language),
  password: Joi.string().min(4).required().messages(language),
});

export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).required().messages(language),
  lastName: Joi.string().min(4).required().messages(language),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages(language),
  password: Joi.string().min(4).required().messages(language),
});

export const deliveryAddressSchema = Joi.object({
  street: Joi.string().strict().required().messages(language),
  zipcode: Joi.string().strict().min(5).required().messages(language),
  city: Joi.string().strict().required().messages(language),
  country: Joi.string().strict().required().messages(language),
});

export const productSchema = Joi.object({
  title: Joi.string().strict().required().messages(language),
  description: Joi.string().strict().required().messages(language),
  price: Joi.number().required().messages(language),
  image: Joi.string()
    .uri()
    .allow('image/png', 'image/jpeg')
    .required()
    .messages(language),
  inStock: Joi.number().required().messages(language),
  categories: Joi.array().min(1).messages(language),
});
