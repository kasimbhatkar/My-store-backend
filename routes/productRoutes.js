import express from 'express';

import { 
    getProductById,
    getProducts,
    deleteProduct
} from '../controller/productController.js';

const router = express.Router();

router.route('/').get(getProducts);

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

export default router;