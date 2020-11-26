import { Business } from "../models";
import CrudController from "./CrudController";
import { HelperMethods } from "../utils";

/**
 * Class representing the business controller
 * @class BusinessController
 * @description business controller
 */
class BusinessController {
  /**
   * Creates a new business
   * Route: POST: /business
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof BusinessController
   */
  static createBusiness = async (req, res) => {
    const crudController = new CrudController(Business, "business", {
      businessName: req.body.businessName,
      customMessage: "Businesses must be unique",
    });
    return await crudController.create(req, res);
  };

  /**
   * Find all businesses
   * Route: POST: /businesses
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof BusinessController
   */
  static findAllBusinesses = async (req, res) => {
    const crudController = new CrudController(Business, "business");
    return await crudController.findAll(req, res);
  };
  /**
   * Find one business
   * Route: GET: /business/:id
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof BusinessController
   */
  static findBusiness = async (req, res) => {
    const crudController = new CrudController(Business, "business");
    return await crudController.findOne(req, res);
  };

  /**
   * Update a business
   * Route: PATCH: /business/:id
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof BusinessController
   */
  static updateBusiness = async (req, res) => {
    const crudController = new CrudController(Business, "business");
    return await crudController.update(req, res);
  };

  /**
   * Delete a business
   * Route: DELETE: /business/:id
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof BusinessController
   */
  static deleteBusiness = async (req, res) => {
    const crudController = new CrudController(Business, "business");
    return await crudController.deleteOne(req, res);
  };
}

export default BusinessController;
