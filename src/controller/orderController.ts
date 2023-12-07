import { Request, Response } from 'express';
import OrderService from '../services/orderServices';

const orderService = new OrderService();

class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const { userId, products, } = req.body;

      const newOrder = await orderService.createOrder(userId, products);
      return res.status(201).json({ status: 200, message: 'success', data: newOrder });
    } catch (error) {
      let errorMessage = 'Failed to create order';
      if (error instanceof Error) {
        errorMessage = error.message; // Access the error message if it's an instance of Error
      }
      return res.status(500).json({ status: 500, message: errorMessage });

    }
  }

  async getOrderHistory(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const orders = await orderService.getOrderHistory(userId);
      return res.status(200).json({ status: 200, message: 'success', data: orders });
    } catch (error) {
      let errorMessage = 'Failed to fetch order history';
      if (error instanceof Error) {
        errorMessage = error.message; // Access the error message if it's an instance of Error
      }
      return res.status(500).json({ status: 500, message: errorMessage });
    }
  }

  async updateOrderStatus(req: Request, res: Response) {
    try {
      const { orderId, status } = req.body;
      console.log("status22",status)

      const updatedOrder = await orderService.updateOrderStatus(orderId, status);
      return res.status(200).json({ status: 200, message: 'success', data: updatedOrder });
    } catch (error) {
      let errorMessage = 'Failed to update order status';
      if (error instanceof Error) {
        errorMessage = error.message; // Access the error message if it's an instance of Error
      }
      return res.status(500).json({ status: 500, message: errorMessage });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params;

      await orderService.deleteOrder(orderId);
      return res.status(200).json({ status: 200, message: 'success' });
    } catch (error) {
      let errorMessage = 'Failed to delete order';
      if (error instanceof Error) {
        errorMessage = error.message; // Access the error message if it's an instance of Error
      }
      return res.status(500).json({ status: 500, message: errorMessage });
    }

  }
}

export default OrderController;
