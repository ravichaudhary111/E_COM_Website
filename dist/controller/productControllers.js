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
const procuctServices_1 = __importDefault(require("../services/procuctServices"));
const productService = new procuctServices_1.default();
class ProductController {
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("==========================>>>>>");
            try {
                const { name, description, price, stock } = req.body;
                const newProduct = yield productService.createProduct(name, description, price, stock);
                return res.status(201).json({ status: 200, message: 'success', data: newProduct });
            }
            catch (error) {
                let errorMessage = 'Failed to create product';
                if (error instanceof Error) {
                    errorMessage = error.message; // Access the error message if it's an instance of Error
                }
                return res.status(500).json({ status: 500, message: errorMessage });
                // return res.status(500).json({ error: 'Failed to create product' });
            }
        });
    }
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("==================111");
                const { page, size, search, sortKey, sortOrder } = req.body;
                const products = yield productService.getAllProducts(page, size, search, sortKey, sortOrder);
                return res.status(200).json({ status: 200, message: 'success', data: products });
            }
            catch (error) {
                let errorMessage = 'Failed to create product';
                if (error instanceof Error) {
                    errorMessage = error.message; // Access the error message if it's an instance of Error
                }
                return res.status(500).json({ status: 500, message: errorMessage });
            }
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const product = yield productService.getProductById(productId);
                return res.status(200).json({ status: 200, message: 'success', data: product });
            }
            catch (error) {
                return res.status(500).json({ error: 'Failed to fetch product' });
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId, name, description, price, stock } = req.body;
                const updatedProduct = yield productService.updateProduct(productId, name, description, price, stock);
                return res.status(200).json({ status: 200, message: 'success', data: updatedProduct });
            }
            catch (error) {
                let errorMessage = 'Failed to cupdate product';
                if (error instanceof Error) {
                    errorMessage = error.message; // Access the error message if it's an instance of Error
                }
                return res.status(500).json({ status: 500, message: errorMessage });
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                yield productService.deleteProduct(productId);
                return res.status(200).json({ status: 200, message: 'success' });
            }
            catch (error) {
                let errorMessage = 'Failed to delete product';
                if (error instanceof Error) {
                    errorMessage = error.message; // Access the error message if it's an instance of Error
                }
                return res.status(500).json({ status: 500, message: errorMessage });
            }
        });
    }
    addReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId, rating, remarks } = req.body;
                const { username } = req;
                const data = yield productService.addReview(productId, rating, remarks, username);
                return res.status(200).json({ status: 200, message: 'success', data });
            }
            catch (error) {
                let errorMessage = 'Failed to add review  product';
                if (error instanceof Error) {
                    errorMessage = error.message; // Access the error message if it's an instance of Error
                }
                return res.status(500).json({ status: 500, message: errorMessage });
            }
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=productControllers.js.map