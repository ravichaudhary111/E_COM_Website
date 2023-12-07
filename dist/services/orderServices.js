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
const order_model_1 = __importDefault(require("../models/order.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
class OrderService {
    createOrder(userId, products) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let totalAmount = 0;
                const productsList = []; // Define the structure for productsList
                for (const productData of products) {
                    const { productId, quantity } = productData;
                    const product = yield product_model_1.default.findOne({ _id: productId });
                    if (!product) {
                        throw new Error('Product not found');
                    }
                    if (!product.stock || product.stock < quantity) {
                        throw new Error('Insufficient stock for the product');
                    }
                    const price = product.price || 0;
                    totalAmount += price * quantity;
                    productsList.push({ product: productId, quantity });
                    // Update remaining stock in Product collection
                    product.stock -= quantity;
                    yield product.save();
                }
                const newOrder = new order_model_1.default({
                    user: userId,
                    products: productsList,
                    totalAmount,
                    status: 'pending',
                });
                const savedOrder = yield newOrder.save();
                return savedOrder;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error('Error creating order: ' + error.message);
                }
                else {
                    throw new Error('Error creating order');
                }
            }
        });
    }
    getOrderHistory(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield order_model_1.default.find({ user: userId });
                if (!orders || !orders.length) {
                    throw new Error('Order History not found');
                }
                return orders;
            }
            catch (error) {
                throw new Error('Error fetching order history');
            }
        });
    }
    updateOrderStatus(orderId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("status33", status);
                const updatedOrder = yield order_model_1.default.findByIdAndUpdate(orderId, { status }, { new: true });
                if (!updatedOrder) {
                    throw new Error('Order not found');
                }
                return updatedOrder;
            }
            catch (error) {
                throw new Error('Error updating order status');
            }
        });
    }
    deleteOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.default.findByIdAndDelete(orderId);
            }
            catch (error) {
                throw new Error('Error deleting product');
            }
        });
    }
}
exports.default = OrderService;
//# sourceMappingURL=orderServices.js.map