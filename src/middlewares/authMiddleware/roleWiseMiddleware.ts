
import { Request, Response, NextFunction } from 'express';

export const adminRoleCheck = (req: Request, res: Response, next: NextFunction) => {
    try {
        const role: String | undefined = req.role; // Access the role from the request object
        console.log("==============rolerole=========>>>>>", role)
        if (!role || role !== 'admin') {
            return res.status(401).json({ message: 'Access denied, user not allowed to access this' });
        }

        // If the role is 'admin', proceed to the next middleware or route
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Error', error });
    }
};