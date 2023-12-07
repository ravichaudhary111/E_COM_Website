import { Model, Document, Schema, model } from 'mongoose';

// Interface defining the Rating structure
export interface IRating {
  rating: number;
  remarks: string;
  username: string;
  // Add more fields as needed
}

// Interface defining the Product document structure
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  ratings: IRating[]; // Array to store ratings
  // Add more fields as needed
}

// Schema definition for the Product model
const productSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  ratings: [{ rating: { type: Number }, remarks: { type: String }, username: { type: String } }],
  // Add more fields as needed
});

// Create and export the Product model based on the schema
const Product: Model<IProduct> = model<IProduct>('Product', productSchema);

export default Product;
