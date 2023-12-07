import express, { Application,Express, Request, Response, NextFunction } from 'express';
import connectDB from './config/database';
import { swaggerSetup } from './swaggerConfig';
import { authMiddleware } from './middlewares/authMiddleware/authMiddleware';


import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import { errorHandler } from './utils/errorHandler';

import dotenv from 'dotenv';
dotenv.config();

// Initialize Express application
const app: Express = express(); // Use Express type directly
//Connect to the database
connectDB();

// Middleware for JSON parsing
app.use(express.json());
app.use("/api/products", authMiddleware);
app.use("/api/orders", authMiddleware );

// // Set up Swagger
// const res = swaggerSetup(app);
// // Define routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);



// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});


// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; // Export the Express app