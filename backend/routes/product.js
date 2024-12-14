import express from 'express';
const router = express.Router();
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controllers/product.js'

router.get("/", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct); 

export default router;