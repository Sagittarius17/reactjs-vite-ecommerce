import express, { request, response } from "express";
import { PORT, MONGO_URI } from "./config/db.js";
import mongoose from "mongoose";
import cors from "cors";
import { Product } from "./models/product.js"

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handeling CORS

//option 1
app.use(cors());

//option 2
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowHeaders: ['Content-Type'],
// })
// )

app.get("/api/products", async(request, response) => {
    try {
        const products = await Product.find({})
        return response.status(200).json({success: true, count: products.length, data: products});
    } catch (error) {
        console.log('error in fetching product:', error.message)
        response.status(500).json({success: false, message: 'server error'})
    }
});

app.post("/api/products", async (request, response) => {
    const product = request.body;

    if (!product.name || !product.price || !product.image) {
        return response
            .status(400)
            .send({ success: false, message: "Provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        response.status(201).json({
            success: true,
            message: "product created successfullly",
            data: newProduct,
        });
    } catch (error) {
        console.error("error creating product", error.message);
        response.status(500).json({ success: false, message: "server error" });
    }
});

app.delete("/api/delete/:id", async(request, response) => {
    const {id} = request.params;

    try {
        await Product.findByIdAndDelete(id)
        response.status(200).json({success: true, message: "Product Deleted"})
    } catch (error) {
        response.status(500).json({success: false, message: "Product not found"})
    }
}) 

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("app connected to database");
        app.listen(PORT, () => {
            console.log(`App is running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
