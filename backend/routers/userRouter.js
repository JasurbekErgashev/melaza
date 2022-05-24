import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";
import { generateToken } from "../utils";

const userRouter = express.Router();

// expressAsyncHandler is used for handling errors / stop if error occured

userRouter.get("/createadmin", expressAsyncHandler(
    async(req, res) =>{
        try{
            const user = new User({
                name: "Jasurbek",
                email: "ac2303018@akfauniversity.org",
                password: "melaza",
                isAdmin: true,
            });
            const createdUser = await user.save();
            res.send(createdUser);
        }catch(err){
            res.status(500).send({message: err.message});
        }
    })
);

userRouter.post("/login", expressAsyncHandler(async (req, res) =>{
    const loginUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if(!loginUser){
        res.status(401).send({
            message: "Invalid Email or Password",
        });
     }else{
         res.send({
             _id: loginUser._id,
             name: loginUser.name,
             email: loginUser.email,
             isAdmin: loginUser.isAdmin,
             token: generateToken(loginUser),
         });
     }
    }) 
);

userRouter.post("/register", expressAsyncHandler(async (req, res) =>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const createdUser = await user.save();
    if(!createdUser){
        res.status(401).send({
            message: "Invalid User Data",
        });
     }else{
         res.send({
             _id: createdUser._id,
             name: createdUser.name,
             email: createdUser.email,
             isAdmin: createdUser.isAdmin,
             token: generateToken(createdUser),
         });
     }
    }) 
);

export default userRouter;