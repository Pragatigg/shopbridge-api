const express = require("express");

const {
    createProduct,
    fetchProducts,
    fetchProduct,
    updateProduct,
    deleteProduct,
    searchProduct
} = require("../controllers/product");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, createProduct);

router.get("/", fetchProducts);

router.get("/search", searchProduct);

router.get("/:id", fetchProduct);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
