import ReviewController from "../controllers/ReviewController";
import Validate from "../validation";
import { Authorization } from "../middlewares";

const businessRoutes = (app) => {
  app.post(
    "/api/v1/review",
    Validate.validateUserInput,
    ReviewController.createReview
  );

  app.get("/api/v1/reviews", ReviewController.findAllReviews);
  app.get("/api/v1/reviews/:business_id", ReviewController.findBusinessReview);
  app.get("/api/v1/review/:id", ReviewController.findOneReview);

  app.patch("/api/v1/review/:id", ReviewController.updateAReview);
  app.delete("/api/v1/review/:id", ReviewController.deleteReview);
};

export default businessRoutes;
