import { createUsers, deleteAllUsers, deleteUsers, findAllUsers, findOneUsers, updateUsers, loginUsers, registerUsers } from "../controller/users.js";
import checkAdmin from "../middlewares/checkAdmin.middleware.js";

const UsersRoute = (app) => {
    app.post("/api/users", createUsers);
    app.get("/api/users", checkAdmin, findAllUsers);
    app.get("/api/users/:userId", checkAdmin, findOneUsers);
    app.put("/api/users/:userId", checkAdmin, updateUsers);
    app.delete("/api/users/:userId", checkAdmin, deleteUsers);
    app.delete("/api/users", checkAdmin, deleteAllUsers);

    app.post("/api/users/login", loginUsers);
    app.post("/api/users/register", registerUsers);
};

export default UsersRoute;