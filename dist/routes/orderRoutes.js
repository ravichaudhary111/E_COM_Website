"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = __importDefault(require("../controller/orderController"));
const authMiddleware_1 = require("../middlewares/authMiddleware/authMiddleware");
const orderValidation_1 = require("../middlewares/validationsMiddleware/orderValidation");
const router = express_1.default.Router();
const orderController = new orderController_1.default();
// Route for creating a new order (requires authentication)
router
    .post('/create', authMiddleware_1.authMiddleware, orderValidation_1.createOrderValidationMiddleware, orderController.createOrder);
// Route for getting order history of a user (requires authentication)
router
    .get('/history/:userId', authMiddleware_1.authMiddleware, orderValidation_1.getOrderHistoryValidationMiddleware, orderController.getOrderHistory);
// Route for updating the status of an order (requires authentication)
router
    .put('/updateStatus', authMiddleware_1.authMiddleware, orderValidation_1.updateStatusValidationMiddleware, orderController.updateOrderStatus);
router
    .delete('/deleteOrder/:orderId', authMiddleware_1.authMiddleware, orderValidation_1.deleteOrderValidationMiddleware, orderController.deleteOrder);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map