"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userServices_1 = __importDefault(require("../services/userServices"));
const userService = new userServices_1.default();
class UserController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, mobileNumber, email, role, password } = req.body;
                ///console.log("-------------registerUser-----")
                const newUser = yield userService.registerUser(username, mobileNumber, email, role, password);
                return res.status(201).json({ status: 200, message: 'success', data: newUser });
            }
            catch (error) {
                let errorMessage = 'Failed to register user';
                if (error instanceof Error) {
                    errorMessage = error.message; // Access the error message if it's an instance of Error
                }
                console.log("registerUser ===========error", errorMessage);
                return res.status(500).json({ status: 500, message: errorMessage });
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, mobileNumber, password } = req.body;
                const token = yield userService.loginUser(email, mobileNumber, password);
                return res.status(200).json({ status: 200, message: 'success', data: token });
            }
            catch (error) {
                let errorMessage = 'Failed to get user details';
                if (error instanceof Error) {
                    errorMessage = error.message; // Access the error message if it's an instance of Error
                }
                return res.status(500).json({ status: 500, message: errorMessage });
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map