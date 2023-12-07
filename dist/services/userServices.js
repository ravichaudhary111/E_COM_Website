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
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    registerUser(username, mobileNumber, email, role, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = {};
                if (mobileNumber && email) {
                    query = { $or: [{ email }, { mobileNumber }] };
                }
                const existingUser = yield user_model_1.default.findOne(query);
                console.log("===existingUser========", existingUser);
                if (existingUser) {
                    /// throw new Error('User already exists');
                    return "User already exists";
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = new user_model_1.default({
                    username,
                    email,
                    mobileNumber,
                    role,
                    password: hashedPassword,
                });
                yield newUser.save();
                return newUser;
            }
            catch (error) {
                console.log("error", error);
                if (error instanceof Error) {
                    console.log("================11111", error.message);
                    throw new Error(error.message); // Throw the specific error message received
                }
                else {
                    console.log("=============222===11111");
                    throw new Error('Error registering user');
                }
            }
        });
    }
    loginUser(email, mobileNumber, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = {};
                if (email) {
                    query = { email };
                }
                else if (mobileNumber) {
                    query = { mobileNumber };
                }
                else {
                    throw new Error('Please provide mobileNumber or email');
                }
                const user = yield user_model_1.default.findOne(query);
                if (!user) {
                    throw new Error('Invalid credentials');
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    throw new Error('Invalid credentials');
                }
                const token = jsonwebtoken_1.default.sign({
                    userId: user._id,
                    role: user.role,
                    username: user.username
                }, 'your_secret_key', { expiresIn: '1h' });
                // Create a new object with user properties and 'token'
                const userWithToken = Object.assign(Object.assign({}, user.toObject()), { // Convert Mongoose document to a plain object
                    token });
                return userWithToken;
            }
            catch (error) {
                console.log("error", error);
                if (error instanceof Error) {
                    console.log("================11111", error.message);
                    throw new Error(error.message); // Throw the specific error message received
                }
                else {
                    throw new Error('Error logging in');
                }
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=userServices.js.map