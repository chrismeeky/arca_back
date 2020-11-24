import { Review } from "../models";
import CrudController from "./CrudController";

/**
 * Class representing the review controller
 * @class ReviewController
 * @description review controller
 */
class ReviewController {
  /**
   * Creates a new review
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof ReviewController
   */
  static async createReview(req, res) {
    const crudController = new CrudController(Review, "review", {
      business: req.body.business,
      user: req.body.user,
      customMessage: "You have already commented on this business",
    });
    return await crudController.create(req, res);
  }

  /**
   * Show all reviews
   * Route: GET: /reviews
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof ReviewController
   */
  static async findAllReviews(req, res) {
    const crudController = new CrudController(Review, "review");
    return await crudController.findAll(req, res);
  }
  /**
   * Find one business
   * Route: GET: /business/:id
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof ReviewController
   */
  static async findBusinessReview(req, res) {
    const crudController = new CrudController(
      Review,
      "review",
      {},
      { business: req.params.business_id, approved: false }
    );
    return await crudController.findAll(req, res);
  }
  /**
   * Find one review
   * Route: GET: /business/:id
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof ReviewController
   */
  static async findOneReview(req, res) {
    const crudController = new CrudController(Review, "review");
    return await crudController.findOne(req, res);
  }
  /**
   * Update a business
   * Route: PATCH: /business/:id
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof ReviewController
   */
  static async updateAReview(req, res) {
    const crudController = new CrudController(Review, "review");
    return await crudController.update(req, res);
  }

  /**
   * Delete a business
   * Route: DELETE: /business/:id
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof ReviewController
   */
  static async deleteReview(req, res) {
    const crudController = new CrudController(Review, "review");
    return await crudController.deleteOne(req, res);
  }
}

export default ReviewController;
