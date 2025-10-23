import express from 'express';
import { createProduct, deleteProduct, getProductId, getProducts, getProductsBySearch, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/",getProducts)
productRouter.post("/", createProduct)
productRouter.delete("/:productID", deleteProduct);
productRouter.put("/:productID",updateProduct)
productRouter.get("/search/:query", getProductsBySearch)
productRouter.get("/:productID", getProductId)




export default productRouter;