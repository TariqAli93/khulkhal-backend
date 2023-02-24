import { createProducts, deleteAllProducts, deleteProduct, findAllProducts, findOneProduct, updateProduct, updateProductVisibility } from "../controller/products.js";
import checkAdmin from "../middlewares/checkAdmin.middleware.js";

const ProductsRoute = (app) => {
    app.post("/api/products", createProducts);
    app.get("/api/products", findAllProducts);
    app.get("/api/products/:productId", findOneProduct);
    app.put("/api/products/:productId", checkAdmin, updateProduct);
    app.patch("/api/changeVisible/:productId", checkAdmin, updateProductVisibility);
    app.delete("/api/products/:productId", checkAdmin, deleteProduct);
    app.delete("/api/products", checkAdmin, deleteAllProducts);
}

export default ProductsRoute;