import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory, getOneCategoryById, getOneCategoryByName, getOneCategoryBySlug, updateCategory } from "../controllers/category";
import { checkBodyRequestCategory } from "../middlewares/checkBodyRequest";
import { checkIsAdmin } from "../middlewares/checkIsAdmin";

const categoryRouter = Router();

categoryRouter.post("/",createCategory);
categoryRouter.get("/",getAllCategory);
categoryRouter.get("/:id", getOneCategoryById);
categoryRouter.get("/name/:name", getOneCategoryByName);
categoryRouter.get("/slug/:slug", getOneCategoryBySlug);
categoryRouter.post("/:id", updateCategory);
categoryRouter.delete("/:id",deleteCategory);

export default categoryRouter;