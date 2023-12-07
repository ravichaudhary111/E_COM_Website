import Joi from 'joi';

// Define a schema for user registration data
export const userRegistrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

// Validate user registration data
export function validateUserRegistration(data: any) {
  return userRegistrationSchema.validate(data);
}

// Define a schema for product creation data
export const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).required(),
});

// Validate product creation data
export function validateProduct(data: any) {
  return productSchema.validate(data);
}

// Define a schema for order creation data
export const orderSchema = Joi.object({
  userId: Joi.string().required(),
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
    })
  ).required(),
  totalAmount: Joi.number().min(0).required(),
});

// Validate order creation data
export function validateOrder(data: any) {
  return orderSchema.validate(data);
}
