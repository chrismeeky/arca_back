import authRoute from "./authRoute";
import businessRoute from "./businessRoute"
import reviewRoute from "./reviewRoute"
const routes = (app) => {
  authRoute(app);
  businessRoute(app)
  reviewRoute(app)
};
export default routes;
