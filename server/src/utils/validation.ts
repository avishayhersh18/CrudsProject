import Joi from "joi";

export const validateLegalName = (name: string): boolean => {
  const schema = Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s'-]+$/);
  const result = schema.validate(name);
  return !result.error;
};

export const isPositiveNumber = (number: number): boolean => {
  const schema = Joi.number().positive();
  const result = schema.validate(number);
  return !result.error && number !== null;
};

export const validateSchema = (schema: Joi.ObjectSchema, value: any) => {
  return schema.validate(value);
};
