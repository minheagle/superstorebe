import user from "./user.route.js";
import product from "./product.route.js";

const initRouter = (app) => {
  app.use("/users", user);
  app.use("/products", product);
};

export default initRouter;
