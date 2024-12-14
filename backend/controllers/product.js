import { Product } from "../models/product.js";
import mongoose from 'mongoose';

export const getProduct = async(request, response) => {
    try {
        const products = await Product.find({})
        return response.status(200).json({success: true, count: products.length, data: products});
    } catch (error) {
        console.log('error in fetching product:', error.message)
        response.status(500).json({success: false, message: 'server error'})
    }
};

export const createProduct = async (request, response) => {
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
};

export const updateProduct = async(request, response) => {
    const { id } = request.params;
    const product = request.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ success:false, message:"invalid product id"})
    }

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        response.status(200).json({ success: true, data: updateProduct })
    } catch (error) {
        response.status(500).json({ success: false, message: "server error"})
    }
};

export const deleteProduct = async(request, response) => {
    const {id} = request.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ success:false, message:"invalid product id"})
    }

    try {
        await Product.findByIdAndDelete(id)
        response.status(200).json({success: true, message: "Product Deleted"})
    } catch (error) {
        response.status(500).json({success: false, message: "Server error."})
    }
}