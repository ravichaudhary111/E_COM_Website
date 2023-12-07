import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const userRegisterValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        mobileNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        role: Joi.string().required().valid("admin", "user")
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }

    next();
};

export const userLoginValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        email: Joi.string().email(),
        mobileNumber: Joi.string().length(10).pattern(/^[0-9]+$/),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map((err) => err.message) });
    }

    next();
};

