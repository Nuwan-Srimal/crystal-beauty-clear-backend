import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {

    if(!isAdmin(req)){
        res.status(403).json({
            message: "You are not authorized to create a product"
        });
        return;
    }

	try {
        
		const productData = req.body;

		const product = new Product(productData);

		await product.save();

		res.json({
			message: "Product created successfully",
			product: product,
		});
        
	} catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to create product",
        });
	}
}

export async function getProducts(req,res){
    console.log("Fetching all products");
    try {        
        const products = await Product.find()
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to retrieve products",
        });
    }
}

export async function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message: "You are not authorized to delete a product"
        });
        return;
    }
    try{

        const productID = req.params.productID
        

        await Product.deleteOne({
            productID : productID
        })

        res.json({
            message: "Product deleted successfully"
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "Failed to delete product",
        });
    }
}

export async function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message: "You are not authorized to update a product"
        });
        return;
    }

    try{
        const productID = req.params.productID;

        const updatedData = req.body;

        await Product.updateOne(
            {productID : productID},
            updatedData
        );

        res.json({
            message: "Product updated successfully"
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "Failed to update product",
        });
    }
}

export async function getProductId(req,res){
    try{
        const productID = req.params.productID;

        const product = await Product.findOne(
            {
                productID : productID
            }
        )
        if(product == null){
            res.status(404).json({
                message: "Product not found"
            });
        }else{
            res.json(product);
        }
    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "Failed to retrieve product by ID",
        });
    }
}

export async function getProductsBySearch(req, res) {
	try {
		const query = req.params.query;

		const products = await Product.find({
			$or: [
				{
					name: { $regex: query, $options: "i" },
				},
				{
					altNames: { $elemMatch: { $regex: query, $options: "i" } },
				},
			],
		});
		res.json(products);
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Failed to search products",
		});
	}
}