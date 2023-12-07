import express from 'express';
import ProductController from '../controller/productControllers';
import { adminRoleCheck } from '../middlewares/authMiddleware/roleWiseMiddleware';


import {
  createProductValidationMiddleware,
  productByIdValidationMiddleware,
  updateProductValidationMiddleware,
  getProductValidationMiddleware,
  AddReviewValidationMiddleware
} from '../middlewares/validationsMiddleware/productValidation';

const router = express.Router();
const productController = new ProductController();

router
  .post('/create',
    adminRoleCheck,
    createProductValidationMiddleware,
    productController.createProduct);

router
  .post('/',
    getProductValidationMiddleware,
    productController.getAllProducts);

router
  .get('/getProductById/:productId',
    productByIdValidationMiddleware,
    productController.getProductById);

router
  .put('/updateProduct',
    adminRoleCheck,
    updateProductValidationMiddleware,
    productController.updateProduct);

router
  .delete('/deleteProduct/:productId',
    adminRoleCheck,
    productByIdValidationMiddleware,
    productController.deleteProduct);

router
  .post('/addReview', 
    AddReviewValidationMiddleware,
    productController.addReview);


export default router;
