import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import data from "./data";
import config from "./config";
import userRouter from "./routers/userRouter";
import productRouter from "./routers/productRouter";


// config.MONGODB_URL
// connecting to the MongoDB
mongoose.connect(config.MONGODB_URL, {
    // configurations for prevention of error and warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    // to make sure our database connected
    console.log("Connected to mongoDB successfully.");
}).catch((error) =>{
    // for errors
    console.log(error);
});

// Usage additional packages
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);


app.get("/api/products", (req, res)=> {
    res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
    const product = data.products.find(x=>x._id === req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message: "Product Not Found!"});
    }
});

app.use((err, req, res, next) =>{
    // 400 is user error
    // 500 is server error
    const status = err.name && err.name === "ValidationError" ? 400 : 500;
    res.status(status).send({message: err.message});
});

app.listen(3000, ()=> {
    console.log("server is running on 3000 port!");
});