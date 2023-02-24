import { createCategories, deleteAllCategories, deleteCategory, findAllCategories, findOneCategory, updateCategory } from "../controller/categories.js";
import checkAdmin from "../middlewares/checkAdmin.middleware.js";

const CategoriesRoute = (app) => {
    app.get("/api/categories", checkAdmin, findAllCategories);
    app.get("/api/categories/:id", checkAdmin, findOneCategory);
    app.post("/api/categories", checkAdmin, createCategories);
    app.put("/api/categories/:id", checkAdmin, updateCategory);
    app.delete("/api/categories/:id", checkAdmin, deleteCategory);
    app.delete("/api/categories", checkAdmin, deleteAllCategories);
};

export default CategoriesRoute;