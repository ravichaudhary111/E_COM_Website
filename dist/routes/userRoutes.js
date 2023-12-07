"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const userValidation_1 = require("../middlewares/validationsMiddleware/userValidation");
const router = express_1.default.Router();
const userController = new userController_1.default();
router
    .post('/registerUser', userValidation_1.userRegisterValidationMiddleware, userController.registerUser);
router
    .post('/login', userValidation_1.userLoginValidationMiddleware, userController.loginUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map