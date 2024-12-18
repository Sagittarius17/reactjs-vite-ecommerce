import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from './routes/product.js'
import path from 'path'
import dotenv from "dotenv";

const PORT = process.env.PORT || 5000;

const app = express();
dotenv.config();
// middleware for parsing request body
app.use(express.json());

// middleware for handeling CORS
app.use(cors());

const __dirname = path.resolve();

app.use('/api/products', productRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("app connected to database");
        app.listen(PORT, () => {
            console.log(`App is live on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
