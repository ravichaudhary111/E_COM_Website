"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Define your secret key for JWT
const JWT_SECRET = 'your_secret_key'; // Replace with your actual secret key
// Middleware function to check token validity
const authMiddleware = (req, res, next) => {
    //console.log("11111auth")
    let token = req.header('Authorization');
    token = token ? token.split(" ")[1] : "";
    console.log("token", token);
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }
    try {
        ///console.log("========token=========",token)
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET); // Adjust the decoded type as needed
        // console.log("========token==1111=======",decoded)
        req.username = decoded.username;
        req.userId = decoded.userId;
        req.role = decoded.role; // Add userId to the request object for further middleware or routes
        // console.log("222222222222",req.role )
        next(); // Proceed to the next middleware or route
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map