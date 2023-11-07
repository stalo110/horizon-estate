import Joi from "joi";

export const registerUserSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().email().required(),
  fullName: Joi.string().trim().required(),
  role: Joi.string().trim(),
  password: Joi.string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9@!#$%^&*]+$/)
    .required()
    .label("password")
    .messages({
      "string.base": "{{#label}} must have one uppercase and one lowercase",
      "string.pattern.base": "{{#label}} must have one special character",
      "any.required": "{{#label}} is required",
    }),
});

export const option = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9@!#$%^&*]+$/)
    .required()
    .label("password")
    .messages({
      "string.base": "{{#label}} must have one uppercase and one lowercase",
      "string.pattern.base": "{{#label}} must have one special character",
      "any.required": "{{#label}} is required",
    }),
});
export const sendVerification = Joi.object().keys({
  email: Joi.string().trim().lowercase().email().required(),
  id: Joi.string().required(),
});
export const verifyCode = Joi.object().keys({
  email: Joi.string().trim().lowercase().email().required(),
  code: Joi.number().required(),
});
export const resetPassword = Joi.object().keys({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().required(),
  code: Joi.number().required(),
});
export const forgotPassword = Joi.object().keys({
  email: Joi.string().trim().lowercase().email().required(),
});

export const NoteSchema = Joi.object().keys({
  Title: Joi.string().required(),
  description: Joi.string().required(),
  DueDate: Joi.date().required(),
});

export const updateUser = Joi.object().keys({
  email: Joi.string().trim().lowercase().email().required(),
  fullName: Joi.string().trim().required(),
  image: Joi.string().uri().trim(),
})
