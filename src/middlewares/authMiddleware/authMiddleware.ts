import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define your secret key for JWT
const JWT_SECRET = process.env.SECRET_KEY || "jkdsess"; // Replace with your actual secret key

// Extend the Request type to include a userId property
declare global {
    namespace Express {
        interface Request {
            userId?: string;
            role?: String;
            username: String;
             // Define the userId property
        }
    }
}

// Middleware function to check token validity
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //console.log("11111auth")
    let token = req.header('Authorization');
    token = token ? token.split(" ")[1] : ""
    console.log("token",token)

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        ///console.log("========token=========",token)
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string, role: String ,username:String}; // Adjust the decoded type as needed
       // console.log("========token==1111=======",decoded)
        req.username=decoded.username
        req.userId = decoded.userId;
        req.role = decoded.role // Add userId to the request object for further middleware or routes
       // console.log("222222222222",req.role )
        next(); // Proceed to the next middleware or route
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

};

