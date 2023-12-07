"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define a schema for user registration data
exports.userRegistrationSchema = joi_1.default.object({
    username: joi_1.default.string().alphanum().min(3).max(30).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});
// Validate user registration data
function validateUserRegistration(data) {
    return exports.userRegistrationSchema.validate(data);
}
exports.validateUserRegistration = validateUserRegistration;
// Define a schema for product creation data
exports.productSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number().min(0).required(),
    stock: joi_1.default.number().min(0).required(),
});
// Validate product creation data
function validateProduct(data) {
    return exports.productSchema.validate(data);
}
exports.validateProduct = validateProduct;
// Define a schema for order creation data
exports.orderSchema = joi_1.default.object({
    userId: joi_1.default.string().required(),
    products: joi_1.default.array().items(joi_1.default.object({
        productId: joi_1.default.string().required(),
        quantity: joi_1.default.number().min(1).required(),
    })).required(),
    totalAmount: joi_1.default.number().min(0).required(),
});
// Validate order creation data
function validateOrder(data) {
    return exports.orderSchema.validate(data);
}
exports.validateOrder = validateOrder;
