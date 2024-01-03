const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')

// @desc Get all products
// @route GET /products
// @access Private
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().lean()
  if (!products?.length) {
    return res.status(400).json({ message: 'No products found' })
  }
  res.json(products)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewProduct = asyncHandler(async (req, res) => {
  const { name, amount, price } = req.body
  if (!name || !amount || !price) {
    return res.status(400).json({ message: 'All Fields are reuired' })
  }

  // Check for duplicate
  const duplicate = await Product.findOne({ name }).lean().exec()
  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate Product' })
  }

  // Create and store new Product
  const projectObject = {
    name,
    amount,
    price
  }
  const product = await Product.create(projectObject)

  if (product) {
    res.status(201).json({ message: `New product : ${name} created`, productObj: product})
  } else {
    res.status(400).json({ message: `Invalid product data recieved`})
  }
})

// @desc Update user
// @route PATHC /users
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { name, amount, price } = req.body
  if (!id || !name || !amount || !price) {
    return res.status(400).json({ message: 'All Fields are reuired' })
  }
  const product = await Product.findById(id).exec()
  if (!product) {
    return res.status(400).json({ message: 'Product not found' })
  }

  const duplicate = await Product.findOne({ name }).lean().exec()
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate Product Name" })
  }

  product.name = name;
  product.amount = amount;
  product.price= price;

  const updatedProduct = await product.save()
  res.json({ message: `${updatedProduct.name} updated`, productObj: updatedProduct })
  
})

// @desc Delete user
// @route DELETE /users
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ message: 'Product ID Required' })
  }
  const product = await Product.findById(id).exec()
  if (!product) {
    return res.status(400).json({ message: 'Product was not found' })
  }
  
  
  const result = await product.deleteOne()
  const reply = `Product ${result.name} with ID ${result._id} deleted!`
  res.json(reply)
})

module.exports = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct
}
