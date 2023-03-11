const express = require("express");
const router = express.Router();
const productRouter = require("./api/products");
const authRouter = require("./api/auth");

router.use("/products", productRouter);
router.use("/auth", authRouter);

module.exports = router;
