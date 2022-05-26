import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel";
import {isAuth, isAdmin} from "../utils";


const productRouter = express.Router();


productRouter.get("/", expressAsyncHandler(async(req, res) =>{
    const searchKeyword = req.query.searchKeyword
    ? {
        name: {
            $regex: req.query.searchKeyword,
            $options: "i",
        },
    } : {};
    const products = await Product.find({...searchKeyword});
    res.send(products);
})
);
productRouter.get("/:id", expressAsyncHandler(async(req, res) =>{
    const product = await Product.findById(req.params.id);
    res.send(product);
})
);

productRouter.post("/", isAuth, isAdmin, expressAsyncHandler(async (req, res) =>{
    const product = new Product({
        name: req.body.name || "sample product",
        description: req.body.description || "sample description",
        category: req.body.category || "sample category",
        image: req.body.image || "images/product-1.png",
    });
    const createdProduct = await product.save();
    if(createdProduct){
        res.status(201).send({message: "Product Created", product: createdProduct});
    }else{
        res.status(500).send({message: "Error in creating product"});
    }
}));

productRouter.put("/:id", isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.quantityInStock = req.body.quantityInStock;
        product.category = req.body.category;
        product.description = req.body.description;

        const updatedProduct = await product.save();

        if(updatedProduct){
            res.send({message: "Product Updated", product: updatedProduct});
        }else{
            res.status(500).send({message: "Error in updating product"});
        }
    }else{
        res.status(404).send({message: "Product Not Found"});
    }
})
);

productRouter.delete("/:id", isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        const deletedProduct = await product.remove();
        res.send({message: "Product Deleted", product: deletedProduct});
    }else{
        res.send(404).send({message: "Product Not Found"});
    }
})
);

productRouter.post("/:id/reviews", isAuth, expressAsyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        const review = {
            rating: req.body.rating,
            comment: req.body.comment,
            user: req.user._id,
            name: req.user.name,
        };
        product.reviews.push(review);
        product.rating = 
            product.reviews.reduce((a, c) => c.rating + a, 0) /
            product.reviews.length;
        product.numReviews = product.reviews.length;
        const updatedProduct = await product.save();
        res.status(201).send({
            message: "Review Added",
            data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        });
    }else{
        throw Error("Product does not exist.");
    }
}));

export default productRouter;