"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Custom error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    // Handling specific types of errors
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({ error: err.message });
    }
    else {
        // For other types of errors
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.errorHandler = errorHandler;
// Custom error class
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
