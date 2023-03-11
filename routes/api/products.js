const express = require("express");
const router = express.Router();
const {
  validateNewProductSchema,
  validateUpdateProductSchema,
  validateDeleteProductSchema,
  validateFindByIdProductSchema,
} = require("../../validation/product.validation");
const {
  createNewProduct,
  showAllProducts,
  showProductById,
  updateProductById,
  deleteProductById,
} = require("../../models/products.model");
const authMiddleware = require("../../middleware/auth.middleware");
const allowModifyMiddleware = require("../../middleware/allowModify.middleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const validatedValue = await validateNewProductSchema(req.body);
    const userData = await createNewProduct(
      validatedValue.productName,
      validatedValue.productDescription,
      validatedValue.productAddress,
      validatedValue.productPhone,
      validatedValue.productImg,
      req.userData.id
    );
    res.json({ msg: "product created", userData }).status(201);
  } catch (error) {
    res.status(400).json({ error: error });
    console.log("error", error);
    console.log("req.body", req.body);
  }
});

router.get("/", async (req, res) => {
  try {
    const allProducts = await showAllProducts();
    res.json(allProducts).status(200);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.get("/getproductbyid/:id", async (req, res) => {
  try {
    const validatedValue = await validateFindByIdProductSchema(req.params);
    const productData = await showProductById(validatedValue.id);
    res.json(productData).status(200);
  } catch (error) {
    res.status(400).json({ error: error });
    console.log(error);
  }
});

router.patch("/", authMiddleware, allowModifyMiddleware, async (req, res) => {
  try {
    const validatedValue = await validateUpdateProductSchema(req.body);
    const productData = await showProductById(validatedValue.id);
    if (!productData) throw "product does not exists";
    if (productData.ownerId === req.userData.id || req.userData.allowAccess) {
      await updateProductById(
        validatedValue.id,
        validatedValue.productName,
        validatedValue.productDescription,
        validatedValue.productAddress,
        validatedValue.productPhone,
        validatedValue.productImg
      );
    } else {
      throw "operation invalid aka unauthorized";
    }
    res.json({ msg: "product updated" });
  } catch (err) {
    res.status(400).json({ error: err });
    console.log(err);
  }
});

router.delete(
  "/:id",
  authMiddleware,
  allowModifyMiddleware,
  async (req, res) => {
    try {
      const validatedValue = await validateDeleteProductSchema(req.params);
      const productData = await showProductById(validatedValue.id);
      if (!productData) throw "card not exists";
      if (productData.ownerId === req.userData.id || req.userData.allowAccess) {
        await deleteProductById(validatedValue.id);
      }
      res.status(200).json({ msg: "product deleted" });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
);

module.exports = router;
