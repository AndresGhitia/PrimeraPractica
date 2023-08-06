import { Router } from "express";
import { CartsMongo } from "../dao/mannagers/mongo/cartsMongo.js";

const cartService = new CartsMongo();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await cartService.getCarts();
    res.json({ status: "Success", data: carts });
  } catch (error) {
    res.json({ status: "Error", message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const cartCreated = await cartService.addCarts();
    res.json({ status: "Success", data: cartCreated });
  } catch (error) {
    res.json({ status: "Error", message: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = await cartService.getCartsById(cartId);

    if (cart) {
      res.json({ status: "Success", data: cart, message: "Carrito Encontrado" });
    } else {
      res.json({ status: "Error", message: "Carrito no encontrado" });
    }
  } catch (error) {
    res.json({ status: "Error", message: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const updatedCart = await cartService.UpdatedCart(cartId, productId);
    res.json({ status: "Success", data: updatedCart, message: "Carrito actualizado" });
  } catch (error) {
    res.json({ status: "Error", message: error.message });
  }
});

export { router as cartsRouter };
