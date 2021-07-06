const express = require("express");

const { 
    createProduct, 
    fetchProducts, 
    fetchProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/product");

const router = express.Router();

router.post("/products", createProduct);

router.get("/products", fetchProducts);

router.get("/products/:id", fetchProduct);

router.patch("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

module.exports = router;