import mongoose, { Schema, Document, Types } from 'mongoose';

// Interface defining the Order document structure
export interface IOrder extends Document {
  user: Types.ObjectId;
  products: Array<{
    product: Types.ObjectId;
    quantity: number;
  }>;
  totalAmount: number;
  status: string;
  // Add more fields as needed
}

// Schema definition for the Order model
const orderSchema: Schema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  // Add more fields as needed
});

// Create and export the Order model based on the schema
const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;