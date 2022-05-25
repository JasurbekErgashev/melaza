import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel";
import {isAuth, isAdmin} from "../utils";


const productRouter = express.Router();

productRouter.post("/", isAuth, isAdmin, expressAsyncHandler(async (req, res) =>{
    const product = new Product({
        name: "sample product",
        description: "sample description",
        category: "sample category",
        image: "../frontend/images/product-1.jpg",
    });
    const createdProduct = await product.save();
    if(createdProduct){
        res.status(201).send({message: "Product Created", product: createdProduct});
    }else{
        res.status(500).send({message: "Error in creating product"});
    }
}));

export default productRouter;