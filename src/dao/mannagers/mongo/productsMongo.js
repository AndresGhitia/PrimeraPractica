import mongoose from "mongoose";
import { productsModel } from "../../models/products.model.js";

export class ProductsMongo {
  constructor() {
    this.model = productsModel;
  }

  async getProducts() {
    try {
      const products = await this.model.find();
      return products;
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al obtener los productos");
    }
  }

  async addProduct(newProduct) {
    try {
      const productCreated = await this.model.create(newProduct);
      return productCreated;
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al crear el producto");
    }
  }

  async getProductById(id) {
    try {
      const product = await this.model.findById(new mongoose.Types.ObjectId(id));
      return product;
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al buscar el producto");
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const updatedProduct = await this.model.findByIdAndUpdate(new mongoose.Types.ObjectId(id), updatedFields, { new: true });
      return updatedProduct;
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al actualizar el producto");
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await this.model.findByIdAndDelete(new mongoose.Types.ObjectId(id));
      return deletedProduct;
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al eliminar el producto");
    }
  }

  async getProducts(limit) {
    try {
      if (limit && typeof limit === "number") {
        const products = await this.model.find().limit(limit);
        return products;
      } else {
        const products = await this.model.find();
        return products;
      }
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al obtener los productos");
    }
  }
}
