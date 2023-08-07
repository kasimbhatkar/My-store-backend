import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';

/**
 * @desc          Get all products
 * @route         Get /api/products
 * @access  public
 */
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

/**
 * @desc         get single product
 * @route        Get /api/products/:id
 * @access  public
 */

const getProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found'});
        }
    } catch (error) {
        console.error(`${error}`);
        res.status(500).json({ message: 'Somthing went wrong'});
    }
});

/**
 * @desc         Delete a product
 * @route        Delete /api/products/:id
 * @access  private
 */
const deleteProduct = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: 'Product deleted' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export { getProducts, getProductById, deleteProduct };