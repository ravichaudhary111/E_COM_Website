import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const createOrderValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        products: Joi.array()
            .items(
                Joi.object({
                    productId: Joi.string().required(),
                    quantity: Joi.number().integer().min(1).required(),
                })
            )
            .required(),
    })
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }

    next();
};

export const getOrderHistoryValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        userId: Joi.string().length(24).hex().required() // Validate productId as a hexadecimal string of length 24 (MongoDB ObjectId)
    });
    const { error } = schema.validate({ userId: req.params.userId });
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }

    next();
};

export const updateStatusValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        orderId: Joi.string().length(24).hex().required(),// Validate productId as a hexadecimal string of length 24 (MongoDB ObjectId)
        status: Joi.string()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }

    next();
};

export const deleteOrderValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        orderId: Joi.string().length(24).hex().required() // Validate productId as a hexadecimal string of length 24 (MongoDB ObjectId)
    });
    const { error } = schema.validate({ orderId: req.params.orderId });
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }

    next();
};