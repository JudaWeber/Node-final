const Joi = require("joi");
const validate = require("./validate");

const newProductSchema = Joi.object({
  productName: Joi.string().min(2).max(255).required().trim(),
  productDescription: Joi.string().min(2).trim(),
  productImg: Joi.string().regex(/^http(s?)\:\/\/(\.?)/),
});
const updateProductSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim().allow(""),
  productName: Joi.string().max(255).trim().allow(""),
  productDescription: Joi.string().trim().allow(""),
  productImg: Joi.string()
    .regex(/^http(s?)\:\/\/(\.?)/)
    .allow(""),
});
const deleteProductSchema = Joi.object({
  id: Joi.string().length(24).hex().trim(),
});
const findProductByIdSchema = Joi.object({
  id: Joi.string().length(24).hex().required().trim(),
});

const validateNewProductSchema = (userInput) => {
  return validate(newProductSchema, userInput);
};
const validateUpdateProductSchema = (userInput) => {
  return validate(updateProductSchema, userInput);
};
const validateDeleteProductSchema = (userInput) => {
  return validate(deleteProductSchema, userInput);
};
const validateFindByIdProductSchema = (userInput) => {
  return validate(findProductByIdSchema, userInput);
};

module.exports = {
  validateNewProductSchema,
  validateUpdateProductSchema,
  validateDeleteProductSchema,
  validateFindByIdProductSchema,
};
