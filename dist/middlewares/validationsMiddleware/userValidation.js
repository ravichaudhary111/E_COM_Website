"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidationMiddleware = exports.userRegisterValidationMiddleware = void 0;
const joi_1 = __importDefault(require("joi"));
const userRegisterValidationMiddleware = (req, res, next) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().alphanum().min(3).max(30).required(),
        email: joi_1.default.string().email().required(),
        mobileNumber: joi_1.default.string().length(10).pattern(/^[0-9]+$/).required(),
        password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        role: joi_1.default.string().required().valid("admin", "user")
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    next();
};
exports.userRegisterValidationMiddleware = userRegisterValidationMiddleware;
const userLoginValidationMiddleware = (req, res, next) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email(),
        mobileNumber: joi_1.default.string().length(10).pattern(/^[0-9]+$/),
        password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    next();
};
exports.userLoginValidationMiddleware = userLoginValidationMiddleware;
//# sourceMappingURL=userValidation.js.map