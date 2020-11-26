import BusinessController from "../controllers/BusinessesController";
import Validate from "../validation";
import { Authorization } from "../middlewares";

const businessRoutes = (app) => {
  app.post(
    "/api/v1/business",
    Validate.validateUserInput,
    BusinessController.createBusiness
  );

  app.get("/api/v1/businesses", BusinessController.findAllBusinesses);
  app.get("/api/v1/business/:id", BusinessController.findBusiness);
  app.patch("/api/v1/business/:id", BusinessController.updateBusiness);
  app.delete("/api/v1/business/:id", BusinessController.deleteBusiness);



};

export default businessRoutes;
