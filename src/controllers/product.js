const Product = require("../models/product");

const createProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.status(201).send(product);
    } catch(error) {
        res.status(400).send(error);
    }
};

const fetchProducts = async (req, res) => {
    try { 
        const result = await Product.find();
        res.status(200).send({
            data: result,
            count: result.length
        });
    } catch(error) {
        res.status(500).send(error);
    }
};

const fetchProduct = async (req, res) => {
    try {
        const result = await Product.findById(req.params.id);
        if(!result) {
            return res.status(404).send();
        }
        res.status(200).send(result);
    } catch(error) {
        res.status(500).send(error)
    }
};

const searchProduct = async (req, res) => {
    console.log(req.query);
    try {
        const result = await Product.find(req.query);
        if(!result.length) {
            return res.status(404).send();
        }
        res.status(200).send(result);
    } catch(error) {
        res.status(500).send(error)
    }
};


const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body,
            {
                new: true,
                runValidators: true
            });
        if(!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch(error) {
        res.status(500).send(error);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch(error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createProduct,
    fetchProducts,
    fetchProduct,
    updateProduct,
    deleteProduct,
    searchProduct
};
