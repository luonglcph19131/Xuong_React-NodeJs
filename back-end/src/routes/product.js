import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getDetailProduct,
  removeProduct,
  updateProduct,
} from "../controllers/product";
// import { checkBodyRequestProduct } from "../middlewares/checkBodyRequest";
// import { checkIsAdmin } from "../middlewares/checkIsAdmin";

const productRouter = Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getDetailProduct);
productRouter.delete("/:id", removeProduct);
productRouter.post("/add", createProduct);
productRouter.put("/:id", updateProduct);

export default productRouter;
