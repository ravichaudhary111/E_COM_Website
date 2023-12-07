"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productControllers_1 = __importDefault(require("../controller/productControllers"));
const roleWiseMiddleware_1 = require("../middlewares/authMiddleware/roleWiseMiddleware");
const productValidation_1 = require("../middlewares/validationsMiddleware/productValidation");
const router = express_1.default.Router();
const productController = new productControllers_1.default();
router
    .post('/create', 
//authMiddleware,
roleWiseMiddleware_1.adminRoleCheck, productValidation_1.createProductValidationMiddleware, productController.createProduct);
router
    .post('/', 
//authMiddleware,
productValidation_1.getProductValidationMiddleware, productController.getAllProducts);
router
    .get('/getProductById/:productId', 
//authMiddleware,
productValidation_1.productByIdValidationMiddleware, productController.getProductById);
router
    .put('/updateProduct', 
//authMiddleware,
roleWiseMiddleware_1.adminRoleCheck, productValidation_1.updateProductValidationMiddleware, productController.updateProduct);
router
    .delete('/deleteProduct/:productId', 
//authMiddleware,
roleWiseMiddleware_1.adminRoleCheck, productValidation_1.productByIdValidationMiddleware, productController.deleteProduct);
router
    .post('/addReview', 
// authMiddleware,
productValidation_1.AddReviewValidationMiddleware, productController.addReview);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map