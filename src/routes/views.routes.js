import { Router } from "express";
import { ProductsMongo } from "../dao/mannagers/mongo/productsMongo.js";
// import { ProductManager } from "../dao/ProductManagers.js";
// const productService = new ProductManager('products.json');

const productService = new ProductsMongo();
const router = Router();

router.get("/", async (req, res) => {
  const products = await productService.getProducts();
  res.render("home", { products });
});

router.get("/chat",(req,res)=>{
  res.render("chat")
})

router.get("/realtimeproducts", async (req, res) => {
  const products = await productService.getProducts();
  res.render("realtimeproducts",{products});
});

export { router as viewsRouter };
