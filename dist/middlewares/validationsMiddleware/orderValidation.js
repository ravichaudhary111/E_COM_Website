"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderValidationMiddleware = exports.updateStatusValidationMiddleware = exports.getOrderHistoryValidationMiddleware = exports.createOrderValidationMiddleware = void 0;
const joi_1 = __importDefault(require("joi"));
const createOrderValidationMiddleware = (req, res, next) => {
    const schema = joi_1.default.object({
        userId: joi_1.default.string().required(),
        products: joi_1.default.array()
            .items(joi_1.default.object({
            productId: joi_1.default.string().required(),
            quantity: joi_1.default.number().integer().min(1).required(),
        }))
            .required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    next();
};
exports.createOrderValidationMiddleware = createOrderValidationMiddleware;
const getOrderHistoryValidationMiddleware = (req, res, next) => {
    const schema = joi_1.default.object({
        userId: joi_1.default.string().length(24).hex().required() // Validate productId as a hexadecimal string of length 24 (MongoDB ObjectId)
    });
    const { error } = schema.validate({ userId: req.params.userId });
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    next();
};
exports.getOrderHistoryValidationMiddleware = getOrderHistoryValidationMiddleware;
const updateStatusValidationMiddleware = (req, res, next) => {
    const schema = joi_1.default.object({
        orderId: joi_1.default.string().length(24).hex().required(), // Validate productId as a hexadecimal string of length 24 (MongoDB ObjectId)
        status: joi_1.default.string()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    next();
};
exports.updateStatusValidationMiddleware = updateStatusValidationMiddleware;
const deleteOrderValidationMiddleware = (req, res, next) => {
    const schema = joi_1.default.object({
        orderId: joi_1.default.string().length(24).hex().required() // Validate productId as a hexadecimal string of length 24 (MongoDB ObjectId)
    });
    const { error } = schema.validate({ orderId: req.params.orderId });
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    next();
};
exports.deleteOrderValidationMiddleware = deleteOrderValidationMiddleware;
//# sourceMappingURL=orderValidation.js.map