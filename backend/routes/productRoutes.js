import express from "express";
import formidable from "express-formidable";
//controllers

import { addProduct,updateProductDetails,removeProduct,fetchProducts ,fetchProductById,fetchAllProducts,addProductReview,fetchTopProducts,fetchNewProducts,filterProducts} from "../controllers/productController.js";
const router=express.Router()

import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from '../middlewares/checkId.js'

router.route('/')
.get(authenticate,fetchProducts)
.post(authenticate,authorizeAdmin,formidable(),addProduct)

router.route('/allproducts').get(fetchAllProducts)
router.route('/:id/reviews').post(authenticate,checkId,addProductReview)

router.get('/top',authenticate,fetchTopProducts)
router.get('/new',authenticate,fetchNewProducts)

router.route('/:id')
.get(authenticate,fetchProductById)
.put(authenticate,authorizeAdmin,formidable(),updateProductDetails)
.delete(authenticate,authorizeAdmin,removeProduct)

router.route("/filtered-products").post(authenticate,filterProducts);


export default router;