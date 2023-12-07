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
const product_model_1 = __importDefault(require("../models/product.model"));
class ProductService {
    createProduct(name, description, price, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = new product_model_1.default({
                    name,
                    description,
                    price,
                    stock,
                });
                yield newProduct.save();
                return newProduct;
            }
            catch (error) {
                throw new Error('Error creating product');
            }
        });
    }
    getAllProducts(page, size, search, sortKey, sortOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pipeline = [];
                console.log("search", search);
                if (search) {
                    const matchQuery = { name: { $regex: search, $options: 'i' } };
                    pipeline.push({ $match: matchQuery });
                }
                const sort = {};
                sort[sortKey] = sortOrder === 'asc' ? 1 : -1;
                if (sort) {
                    pipeline.push({ $sort: sort });
                }
                if (page && size) {
                    pipeline.push({ $skip: page * size }, { $limit: size });
                }
                let products = yield product_model_1.default.aggregate(pipeline);
                console.log("======", products);
                if (products && products.length) {
                    products = this.calculateAvgRatings(products);
                }
                return products;
            }
            catch (error) {
                //   throw new Error('Error fetching products');
                // }
                console.log("error", error);
                if (error instanceof Error) {
                    throw new Error(error.message); // Throw the specific error message received
                }
                else {
                    throw new Error('Error fetching products');
                }
            }
        });
    }
    calculateAvgRatings(products) {
        return products.map(product => {
            const ratings = product.ratings;
            if (ratings && ratings.length > 0) {
                const totalRating = ratings.reduce((total, val) => total + val.rating, 0);
                const avgRating = totalRating / ratings.length;
                return Object.assign(Object.assign({}, product), { avgRating }); // Include the average rating in the product object
            }
            return Object.assign(Object.assign({}, product), { avgRating: 0 }); // Set default average rating if no ratings available
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_model_1.default.findById(productId);
                if (!product) {
                    throw new Error('Product not found');
                }
                const productWithAvgRating = this.calculateAvgRating(product);
                return productWithAvgRating;
            }
            catch (error) {
                console.log("error", error);
                if (error instanceof Error) {
                    throw new Error(error.message); // Throw the specific error message received
                }
                else {
                    throw new Error('Error fetch product');
                }
            }
        });
    }
    calculateAvgRating(product) {
        const ratings = product.ratings;
        if (ratings && ratings.length > 0) {
            const totalRating = ratings.reduce((total, val) => total + val.rating, 0);
            const avgRating = totalRating / ratings.length;
            delete product.ratings;
            return Object.assign(Object.assign({}, product.toObject()), { avgRating }); // Include the average rating in the product object
        }
        return Object.assign(Object.assign({}, product.toObject()), { avgRating: 0 }); // Set default average rating if no ratings available
    }
    updateProduct(productId, name, description, price, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedProduct = yield product_model_1.default.findByIdAndUpdate(productId, { name, description, price, stock }, { new: true });
                if (!updatedProduct) {
                    throw new Error('Product not found');
                }
                return updatedProduct;
            }
            catch (error) {
                console.log("error", error);
                if (error instanceof Error) {
                    throw new Error(error.message); // Throw the specific error message received
                }
                else {
                    throw new Error('Error updating product');
                }
            }
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.default.findByIdAndDelete(productId);
            }
            catch (error) {
                throw new Error('Error deleting product');
            }
        });
    }
    addReview(productId, rating, remarks, username) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("username", username);
            yield product_model_1.default.updateOne({ _id: productId }, {
                $addToSet: {
                    ratings: {
                        rating,
                        remarks,
                        username
                    }
                }
            });
        });
    }
}
//rating api remaining
exports.default = ProductService;
//# sourceMappingURL=procuctServices.js.map