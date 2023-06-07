import user from "./user.router.js";

const initRouter = (app) => {
  app.use("/users", user);
};

export default initRouter;
