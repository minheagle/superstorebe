import user from "./user.route.js";
import userAdmin from "./user.admin.route.js";
import product from "./product.route.js";

const initRouter = (app) => {
  app.use("/users", user);
  app.use("/admin/users", userAdmin);
  app.use("/products", product);
};

export default initRouter;
