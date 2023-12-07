"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddReviewValidationMiddleware = exports.updateProductValidationMiddleware = exports.productByIdValidationMiddleware = exports.getProductValidationMiddleware = exports.createProductValidationMiddleware = void 0;
const joi_1 = __importDefault(require("joi"));
const createProductValidationMiddleware = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).max(30).required(),
        description: joi_1.default.string().min(10).max(200).required(),
        price: joi_1.default.number().required(),
        stock: joi_1.default.number().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    next();
};
exports.createProductValidationMiddleware = createProductValidationMiddleware;
const getProductValidationMiddleware = (req, res, next) => {
    const schema = joi_1.default.object({
        page: joi_1.default.number().min(0).when('search', {
            is: joi_1.default.exist(),
            then: joi_1.default.optional(),
            otherwise: joi_1.default.required()
        }),
        size: joi_1.default.number().min(5).max(10).when('search', {
            is: joi_1.default.exist(),
            then: joi_1.default.optional(),
            otherwise: joi_1.default.required()
        }),
        search: joi_1.default.string(),
        sortKey: joi_1.default.string().valid("name", "price"),
        sortOrder: joi_1.default.string().valid("asc", "dec").when('sortKey', {
            is: joi_1.default.exist(),
            then: joi_1.default.required(),
        }),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    next();
};
exports.getProductValidationMiddleware = getProductValidationMiddleware;
const productByIdValidationMiddleware = (req, res, next) => {
    const schema = joi_1.default.object({
        productId: joi_1.default.string().length(24).hex().required() // Validate productId as a hexadecimal string of length 24 (MongoDB ObjectId)
    });
    const { error } = schema.validate({ productId: req.params.productId });
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    next();
};
exports.productByIdValidationMiddleware = productByIdValidationMiddleware;
const updateProductValidationMiddleware = (req, res, next) => {
    const schema = joi_1.default.object({
        productId: joi_1.default.string().required(),
        name: joi_1.default.string().min(3).max(30),
        description: joi_1.default.string(),
        price: joi_1.default.number(),
        stock: joi_1.default.number(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    next();
};
exports.updateProductValidationMiddleware = updateProductValidationMiddleware;
const AddReviewValidationMiddleware = (req, res, next) => {
    const schema = joi_1.default.object({
        productId: joi_1.default.string().required(),
        remarks: joi_1.default.string(),
        rating: joi_1.default.number().min(0).max(5).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    next();
};
exports.AddReviewValidationMiddleware = AddReviewValidationMiddleware;
//# sourceMappingURL=productValidation.js.map