import Order, { IOrder } from '../models/order.model';
import User from '../models/user.model';
import Product from '../models/product.model';

class OrderService {

  async createOrder(userId: string, products: { productId: string; quantity: number }[]): Promise<IOrder> {
    try {
      let totalAmount: number = 0;
      const productsList: { product: string; quantity: number }[] = []; // Define the structure for productsList
  
      for (const productData of products) {
        const { productId, quantity } = productData;
  
        const product = await Product.findOne({ _id: productId });
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
        await product.save();
      }
  
      const newOrder = new Order({
        user: userId,
        products: productsList,
        totalAmount,
        status: 'pending',
      });
  
      const savedOrder = await newOrder.save();
  
      return savedOrder;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Error creating order: ' + error.message);
      } else {
        throw new Error('Error creating order');
      }
    }
  }


  async getOrderHistory(userId: string) {
    try {
      const orders = await Order.find({ user: userId });
      if(!orders || !orders.length){
        throw new Error('Order History not found');
      }
      return orders;
    } catch (error) {
      throw new Error('Error fetching order history');
    }
  }

  async updateOrderStatus(orderId: string, status: string) {
    try {
      console.log("status33",status)
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

      if (!updatedOrder) {
        throw new Error('Order not found');
      }

      return updatedOrder;
    } catch (error) {
      throw new Error('Error updating order status');
    }
  }

  async deleteOrder(orderId: string) {
    try {
      await Product.findByIdAndDelete(orderId);
    } catch (error) {
      throw new Error('Error deleting product');
    }
  }
}

export default OrderService;
