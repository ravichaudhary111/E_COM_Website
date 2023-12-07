import express from 'express';
import OrderController from '../controller/orderController';

import {
  createOrderValidationMiddleware,
  getOrderHistoryValidationMiddleware,
  updateStatusValidationMiddleware,
  deleteOrderValidationMiddleware
} from '../middlewares/validationsMiddleware/orderValidation';

const router = express.Router();
const orderController = new OrderController();

// Route for creating a new order (requires authentication)
router
  .post('/create',
    createOrderValidationMiddleware,
    orderController.createOrder);

// Route for getting order history of a user (requires authentication)
router
  .get('/history/:userId',
    getOrderHistoryValidationMiddleware,
    orderController.getOrderHistory);

// Route for updating the status of an order (requires authentication)
router
  .put('/updateStatus',
    updateStatusValidationMiddleware,
    orderController.updateOrderStatus);

router
  .delete('/deleteOrder/:orderId',
    deleteOrderValidationMiddleware,
    orderController.deleteOrder);

export default router;
