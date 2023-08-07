import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  let data = req.body;
  try {
    const product = new Product(data);
    // console.log('createProduct', product)
    await product.save();
    return res.json({
      status_code: 200,
      success: true,
      message: "product created successfully",
      data: product,
    });
  } catch (error) {
    console.log(error)
    return res.json({
        status_code: 500,
        success: false,
        message: "product not created",
      });
  }
};
