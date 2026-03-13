import Product from "../models/Product.js";

// Get All Products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Get Single Product
export const getProductById = async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.id);
        if (!foundProduct) {
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(foundProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Create Product
export const createProduct = async (req, res) => {
    try {
        const {name, description, price, category, stock, image} = req.body;
        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            image,
            createdBy: req.user._id
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update Product
export const updateProduct = async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.id);
        if (!foundProduct) {
            return res.status(404).json({message: 'Product not found'});
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const foundProduct = await Product.findById(req.params.id);
        if (!foundProduct) {
            return res.status(404).json({message: 'Product not found'});
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Product deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};