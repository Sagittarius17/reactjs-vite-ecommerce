import express, { request, response } from "express";
import { PORT, MONGO_URI } from "./config/db.js";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from './routes/product.js'

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
app.use('/api/products', productRoutes)
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
