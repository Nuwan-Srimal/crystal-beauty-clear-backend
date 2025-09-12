import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routes/productRouter.js";
import cors from "cors";
import dotenv from "dotenv";
import orderRouter from "./routes/orderRouter.js";

dotenv.config();

const app = express()
app.use(cors())

app.use(express.json())

app.use(
    (req,res,next)=>{

        let token = req.header("Authorization")

        if(token != null){
            token = token.replace("Bearer ","")
            jwt.verify(token, process.env.JWT_LOKI,
                (err, decoded)=>{
                    if(decoded == null){
                        res.json({
                            message: "Invalid token please login again"
                        })
                        return
                    }else{
                        req.user = decoded
                    }
                }
            )

        }
        next()
    }
)

const connectionString = process.env.MONGO_URI


mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database connected Successfully")
    }
).catch(
    ()=>{
        console.log("Database connection failed")
    }
)




app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/orders", orderRouter)


app.listen(5000, 
    ()=>{
        console.log("Server is running on port 5000")
    }
)