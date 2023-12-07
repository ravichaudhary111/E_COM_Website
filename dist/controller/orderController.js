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
const orderServices_1 = __importDefault(require("../services/orderServices"));
const orderService = new orderServices_1.default();
class OrderController {
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, products, } = req.body;
                const newOrder = yield orderService.createOrder(userId, products);
                return res.status(201).json({ status: 200, message: 'success', data: newOrder });
            }
            catch (error) {
                let errorMessage = 'Failed to create order';
                if (error instanceof Error) {
                    errorMessage = error.message; // Access the error message if it's an instance of Error
                }
                return res.status(500).json({ status: 500, message: errorMessage });
            }
        });
    }
    getOrderHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const orders = yield orderService.getOrderHistory(userId);
                return res.status(200).json({ status: 200, message: 'success', data: orders });
            }
            catch (error) {
                let errorMessage = 'Failed to fetch order history';
                if (error instanceof Error) {
                    errorMessage = error.message; // Access the error message if it's an instance of Error
                }
                return res.status(500).json({ status: 500, message: errorMessage });
            }
        });
    }
    updateOrderStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderId, status } = req.body;
                console.log("status22", status);
                const updatedOrder = yield orderService.updateOrderStatus(orderId, status);
                return res.status(200).json({ status: 200, message: 'success', data: updatedOrder });
            }
            catch (error) {
                let errorMessage = 'Failed to update order status';
                if (error instanceof Error) {
                    errorMessage = error.message; // Access the error message if it's an instance of Error
                }
                return res.status(500).json({ status: 500, message: errorMessage });
            }
        });
    }
    deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderId } = req.params;
                yield orderService.deleteOrder(orderId);
                return res.status(200).json({ status: 200, message: 'success' });
            }
            catch (error) {
                let errorMessage = 'Failed to delete order';
                if (error instanceof Error) {
                    errorMessage = error.message; // Access the error message if it's an instance of Error
                }
                return res.status(500).json({ status: 500, message: errorMessage });
            }
        });
    }
}
exports.default = OrderController;
//# sourceMappingURL=orderController.js.map