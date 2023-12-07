import Product, { IProduct, IRating } from '../models/product.model';
import { FilterQuery } from 'mongoose';

class ProductService {
  async createProduct(name: string, description: string, price: number, stock: number) {
    try {
      const newProduct = new Product({
        name,
        description,
        price,
        stock,
      });

      await newProduct.save();

      return newProduct;
    } catch (error) {
      throw new Error('Error creating product');
    }
  }

  async getAllProducts(
    page: number,
    size: number,
    search: string | undefined,
    sortKey: string,
    sortOrder: string
  ) {
    try {
      const pipeline: any[] = [];
      console.log("search", search)
      if (search) {
        const matchQuery: FilterQuery<any> = { name: { $regex: search, $options: 'i' } };
        pipeline.push({ $match: matchQuery });
      }

      const sort: any = {};
      sort[sortKey] = sortOrder === 'asc' ? 1 : -1;
      if (sort) {
        pipeline.push(
          { $sort: sort },
        );
      }
      if (page && size) {
        pipeline.push(
          { $skip: page * size },
          { $limit: size }
        );
      }

      let products = await Product.aggregate<any>(pipeline);
      console.log("======",products)
      if (products && products.length) {
        products = this.calculateAvgRatings(products);
      }

      return products;
    } catch (error) {
    //   throw new Error('Error fetching products');
    // }
    console.log("error", error);
    if (error instanceof Error) {
      throw new Error(error.message); // Throw the specific error message received
    } else {
      throw new Error('Error fetching products');
    }
  }
  }

  private calculateAvgRatings(products: any[]): any[] {
    return products.map(product => {
      const ratings = product.ratings;
      if (ratings && ratings.length > 0) {
        const totalRating = ratings.reduce((total: number, val: { rating: number, review: string ,username:String}) =>
         total + val.rating, 0);
        const avgRating = totalRating / ratings.length;
        return { ...product, avgRating }; // Include the average rating in the product object
      }
      return { ...product, avgRating: 0 }; // Set default average rating if no ratings available
    });
  }

  async getProductById(productId: string) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      const productWithAvgRating = this.calculateAvgRating(product);
      return productWithAvgRating;
    } catch (error) {
      console.log("error", error);
      if (error instanceof Error) {
        throw new Error(error.message); // Throw the specific error message received
      } else {
        throw new Error('Error fetch product');
      }
    }
  }

  private calculateAvgRating(product: any) {
    const ratings = product.ratings;

    if (ratings && ratings.length > 0) {

      const totalRating = ratings.reduce((total:number, val:{rating:number,review:string,username:String}) =>
       total + val.rating, 0);
      const avgRating = totalRating / ratings.length;
      delete product.ratings;
      return { ...product.toObject(), avgRating }; // Include the average rating in the product object
    }
    return { ...product.toObject(), avgRating: 0 }; // Set default average rating if no ratings available
  }



  async updateProduct(productId: string, name: string, description: string, price: number, stock: number) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, description, price, stock },
        { new: true }
      );

      if (!updatedProduct) {
        throw new Error('Product not found');
      }

      return updatedProduct;
    } catch (error) {
      console.log("error", error);
      if (error instanceof Error) {
        throw new Error(error.message); // Throw the specific error message received
      } else {
        throw new Error('Error updating product');
      }
    }
  }

  async deleteProduct(productId: string) {
    try {
      await Product.findByIdAndDelete(productId);
    } catch (error) {
      throw new Error('Error deleting product');
    }
  }

  async addReview(productId: string, rating: number, remarks: string, username: String) {
    console.log("username", username)
    await Product.updateOne({ _id: productId },
      {
        $addToSet: {
          ratings: {
            rating,
            remarks,
            username
          }
        }
      })
  }
}


//rating api remaining

export default ProductService;
