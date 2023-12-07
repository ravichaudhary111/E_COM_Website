import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const createProductValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        description: Joi.string().min(10).max(200).required(),
        price: Joi.number().required(),
        stock: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }

    next();
};

export const getProductValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        page: Joi.number().min(0).when('search', {
            is: Joi.exist(),
            then: Joi.optional(),
            otherwise: Joi.required()
        }),
        size: Joi.number().min(5).max(10).when('search', {
            is: Joi.exist(),
            then: Joi.optional(),
            otherwise: Joi.required()
        }),
        search: Joi.string(),
        sortKey: Joi.string().valid("name", "price"),
        sortOrder: Joi.string().valid("asc", "dec").when('sortKey', {
            is: Joi.exist(),
            then: Joi.required(),
        }),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }
    next()
}

export const productByIdValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        productId: Joi.string().length(24).hex().required() // Validate productId as a hexadecimal string of length 24 (MongoDB ObjectId)
    });
    const { error } = schema.validate({ productId: req.params.productId });
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }

    next();
};


export const updateProductValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        productId: Joi.string().required(),
        name: Joi.string().min(3).max(30),
        description: Joi.string(),
        price: Joi.number(),
        stock: Joi.number(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }

    next();
};


export const AddReviewValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        productId: Joi.string().required(),
        remarks: Joi.string(),
        rating: Joi.number().min(0).max(5).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }

    next();
};