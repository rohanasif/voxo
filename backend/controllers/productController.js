import asyncHandler from "express-async-handler";
import Product from "../models/productModel";
import Rating from "../models/ratingModel";

export const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    if (products) {
      res.status(200);
      res.json(products);
    } else {
      res.status(404);
      res.json({ message: "No products found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

export const getProductById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      res.status(200);
      res.json(product);
    } else {
      res.status(404);
      res.json({ message: "No product found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

export const addProduct = asyncHandler(async (req, res) => {
  try {
    const { id, title, price, description, category, image, rate, count } =
      req.body;
    if (
      !id ||
      !title ||
      !price ||
      !description ||
      !category ||
      !image ||
      !rate ||
      !count
    ) {
      res.status(400);
      throw new Error("All fields are required");
    }
    const exists = await Product.findOne({ id });
    if (exists) {
      res.status(400);
      throw new Error("This product is already added");
    }
    const rating = await Rating.create({
      rate,
      count,
    });
    const product = await Product.create({
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
    });
    if (product) {
      res.status(201);
      res.json({
        _id: product.id,
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: product.rating,
      });
    } else {
      res.status(400);
      throw new Error("Could not add product");
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, description, category, image, rating } = req.body;
    if (
      !id ||
      !title ||
      !price ||
      !description ||
      !category ||
      !image ||
      !rating
    ) {
      res.status(400);
      throw new Error("All fields are required");
    }
    const product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        price,
        description,
        category,
        image,
        rating,
      },
      { new: true }
    );
  } catch (error) {
    res.json({ message: error.message });
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      res.status(200);
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404);
      res.json({ message: "No product found" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});
