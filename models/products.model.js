const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  productName: { type: String, required: true },
  productDescription: { type: String },
  productImg: { type: String },
  ownerId: { type: String },
});

const Products = mongoose.model("product", productsSchema);

const createNewProduct = (
  productName,
  productDescription,
  productImg,
  ownerId
) => {
  const product = new Products({
    productName,
    productDescription,
    productImg,
    ownerId,
  });
  return product.save();
};

const showAllProducts = () => {
  return Products.find({});
};

const showProductById = (id) => {
  return Products.findById(id);
};

const updateProductById = (id, productName, productDescription, productImg) => {
  return Products.findByIdAndUpdate(
    id,
    {
      productName,
      productDescription,
      productImg,
    },
    { returnDocument: "after" }
  );
};

const deleteProductById = (id) => {
  return Products.findByIdAndDelete(id);
};

module.exports = {
  createNewProduct,
  showAllProducts,
  showProductById,
  updateProductById,
  deleteProductById,
};
