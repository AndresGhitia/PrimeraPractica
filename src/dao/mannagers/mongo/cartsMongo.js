import { cartsModel } from "../../models/carts.model.js";
import mongoose from "mongoose";

export class CartsMongo {
  constructor() {
    this.model = cartsModel;
  }

  async getCarts() {
    try {
      const carts = await this.model.find();
      return carts;
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al obtener los carritos");
    }
  }

  async addCarts() {
    try {
      const cartCreated = await this.model.create({ products: [] });
      return cartCreated;
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al crear el carrito");
    }
  }

  async getCartsById(cartId) {
    try {
      const cart = await this.model.findById(cartId);
      return cart;
    } catch (error) {
      console.log(error.message);
      throw new Error("Error al buscar el carrito");
    }
  }

  async UpdatedCart(selectedCartId, productId) {
    try {
      const selectedCart = await this.getCartsById(selectedCartId);
      if (!selectedCart) {
        throw new Error("El carrito seleccionado no existe");
      }

      const productObjectId = mongoose.Types.ObjectId(productId);

      const existingProduct = selectedCart.products.find((product) => product.product.equals(productObjectId));

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        selectedCart.products.push({ product: productObjectId, quantity: 1 });
      }

      await selectedCart.save();

      return selectedCart;
    } catch (error) {
      console.log("Error al actualizar el carrito:", error);
      throw error;
    }
  }
}
