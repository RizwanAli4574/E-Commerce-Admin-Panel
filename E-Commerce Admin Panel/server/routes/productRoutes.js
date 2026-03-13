import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';
import {protect, adminOnly} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllProducts);
router.get('/:id', protect, getProductById);
router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;
