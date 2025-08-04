import express from 'express';
import { createProduct, deleteProduct, getProductId, getProducts, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/",getProducts)
productRouter.post("/", createProduct)
productRouter.delete("/:productID", deleteProduct);
productRouter.put("/:productID",updateProduct)
productRouter.get("/:productID", getProductId)




export default productRouter;