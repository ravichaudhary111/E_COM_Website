import { Request, Response } from 'express';
import ProductService from '../services/procuctServices';

const productService = new ProductService();

class ProductController {
  async createProduct(req: Request, res: Response) {
    console.log("==========================>>>>>")
    try {
      const { name, description, price, stock } = req.body;

      const newProduct = await productService.createProduct(name, description, price, stock);
      return res.status(201).json({ status: 200, message: 'success', data: newProduct });
    } catch (error) {
      let errorMessage = 'Failed to create product';
      if (error instanceof Error) {
        errorMessage = error.message; // Access the error message if it's an instance of Error
      }
      return res.status(500).json({ status: 500, message: errorMessage });
      // return res.status(500).json({ error: 'Failed to create product' });
    }
  }

  async getAllProducts(req: Request, res: Response) {
    try {
      console.log("==================111")
      const { page, size, search, sortKey, sortOrder } = req.body

      const products = await productService.getAllProducts(page, size, search, sortKey, sortOrder);
      return res.status(200).json({ status: 200, message: 'success', data: products });
    } catch (error) {
      let errorMessage = 'Failed to create product';
      if (error instanceof Error) {
        errorMessage = error.message; // Access the error message if it's an instance of Error
      }
      return res.status(500).json({ status: 500, message: errorMessage });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { productId } = req.params;

      const product = await productService.getProductById(productId);
      return res.status(200).json({ status: 200, message: 'success', data: product });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch product' });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { productId, name, description, price, stock } = req.body;

      const updatedProduct = await productService.updateProduct(productId, name, description, price, stock);
      return res.status(200).json({ status: 200, message: 'success', data: updatedProduct });
    } catch (error) {
      let errorMessage = 'Failed to cupdate product';
      if (error instanceof Error) {
        errorMessage = error.message; // Access the error message if it's an instance of Error
      }
      return res.status(500).json({ status: 500, message: errorMessage });
    }

  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;

      await productService.deleteProduct(productId);
      return res.status(200).json({ status: 200, message: 'success' });
    } catch (error) {
      let errorMessage = 'Failed to delete product';
      if (error instanceof Error) {
        errorMessage = error.message; // Access the error message if it's an instance of Error
      }
      return res.status(500).json({ status: 500, message: errorMessage });
    }
  }
  async addReview(req: Request, res: Response) {
    try {
      const { productId, rating, remarks } = req.body;
      const { username } = req;
      const data = await productService.addReview(productId, rating, remarks, username);
      return res.status(200).json({ status: 200, message: 'success', data });
    } catch (error) {
      let errorMessage = 'Failed to add review  product';
      if (error instanceof Error) {
        errorMessage = error.message; // Access the error message if it's an instance of Error
      }
      return res.status(500).json({ status: 500, message: errorMessage });
    }
  }

}

export default ProductController;
