const express = require("express");
const Product = require("../models/product");

const router = express.Router();

router.post("/products", async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.status(201).send(product);
    } catch(error) {
        res.status(400).send(error);
    }
});

router.get("/products", async (req, res) => {
    try { 
        const result = await Product.find();
        res.status(200).send(result);
    } catch(error) {
        res.status(500).send(error);
    }
});

router.get("/products/:id", async (req, res) => {
    try {
        const result = await Product.findById(req.params.id);
        if(!result) {
            return res.status(404).send();
        }
        res.status(200).send(result);
    } catch(error) {
        res.status(500).send(error)
    }
});

router.patch("/products/:id", async (req, res) => {
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
});

router.delete("/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch(error) {
        res.status(500).send(error);
    }
});


module.exports = router;