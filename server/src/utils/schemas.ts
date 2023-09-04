import Joi, { CustomValidator } from "joi";
import { isValidObjectId } from "mongoose";

export const validateObjectId: CustomValidator = (value) => {
  if (isValidObjectId(value)) {
    return value;
  }
  throw new Error("Id not valid");
};

export const createPersonSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required().max(120).min(1),
  gender: Joi.valid("Male", "Female").required(),
  belongs_to: Joi.array().items(Joi.custom(validateObjectId)).optional(),
});
