"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoleCheck = void 0;
const adminRoleCheck = (req, res, next) => {
    try {
        const role = req.role; // Access the role from the request object
        console.log("==============rolerole=========>>>>>", role);
        if (!role || role !== 'admin') {
            return res.status(401).json({ message: 'Access denied, user not allowed to access this' });
        }
        // If the role is 'admin', proceed to the next middleware or route
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Error', error });
    }
};
exports.adminRoleCheck = adminRoleCheck;
//# sourceMappingURL=roleWiseMiddleware.js.map