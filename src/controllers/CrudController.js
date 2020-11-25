import { HelperMethods } from "../utils";

/**
 * Class representing the business controller
 * @class CrudController
 * @description business controller
 */
class CrudController {
  constructor(model, modelName, unique = {}, criteria = {}) {
    this.Model = model;
    this.modelName = modelName;
    this.unique = unique;
    this.criteria = criteria;
  }

  checkCriteria = async (req) => {
    const criteria = Object.keys(this.criteria).length
      ? this.criteria
      : { _id: req.params.id };
    return criteria;
  };
  /**
   * Creates a new data
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof CrudController
   */
  create = async (req, res) => {
    try {
      const unique = { ...this.unique };
      delete unique.customMessage;
      if (Object.keys(this.unique).length) {
        const isExist = await this.Model.findOne(unique);
        if (isExist)
          return HelperMethods.clientError(res, this.unique.customMessage);
      }
      const newData = new this.Model(req.body);
      const savedData = await newData.save();
      if (savedData) {
        return HelperMethods.requestSuccessful(res, {
          success: true,
          [this.modelName]: savedData,
        });
      }
      return HelperMethods.clientError(
        res,
        `There was a problem creating this ${this.modelName}`
      );
    } catch (error) {
      return HelperMethods.serverError(res, error.message);
    }
  };

  /**
   * Find all data
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof CrudController
   */
  findAll = async (req, res) => {
    try {
      const data = await this.Model.find(this.criteria);
      if (data && data.length) {
        return HelperMethods.requestSuccessful(res, {
          message: `${this.modelName} successfully listed`,
          [`${this.modelName}s`]: data,
        });
      }
      return HelperMethods.clientError(res, `No ${this.modelName}s was found`);
    } catch (error) {
      return HelperMethods.serverError(res, error.message);
    }
  };
  /**
   * Find one
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof CrudController
   */
  findOne = async (req, res) => {
    const findOneCriteria =await this.checkCriteria(req);
    try {
      const data = await this.Model.findOne(findOneCriteria);
      if (data) {
        return HelperMethods.requestSuccessful(res, {
          message: `${this.modelName} found successfully`,
          [this.modelName]: data,
        });
      }
      return HelperMethods.clientError(res, `${this.modelName} does not exist`);
    } catch (error) {
      return HelperMethods.serverError(res, error.message);
    }
  };

  /**
   * Update a data
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof CrudController
   */
  update = async (req, res) => {
    const updateCriteria =await this.checkCriteria(req);
    try {
      const data = await this.Model.findOne(updateCriteria);
      if (!data) {
        return HelperMethods.clientError(
          res,
          `${this.modelName} does not exist`
        );
      }
      const updatedData = await this.Model.updateOne(updateCriteria, {
        $set: req.body,
      });
      if (updatedData) {
        return HelperMethods.requestSuccessful(res, {
          message: `${this.modelName} successfully updated`,
        });
      }
      return HelperMethods.clientError(
        res,
        `${this.modelName} could not be updated`
      );
    } catch (error) {
      return HelperMethods.serverError(res, error.message);
    }
  };

  /**
   * Delete data
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof CrudController
   */
  deleteOne = async (req, res) => {
    const deleteCriteria =await this.checkCriteria(req);
    try {
      const data = await this.Model.findOne(deleteCriteria);
      if (!data) {
        return HelperMethods.clientError(
          res,
          `${this.modelName} does not exist`
        );
      }
      const deletedData = await this.Model.deleteOne(deleteCriteria);
      if (deletedData) {
        return HelperMethods.requestSuccessful(res, {
          message: `${this.modelName} successfully deleted`,
        });
      }
      return HelperMethods.clientError(
        res,
        `${this.modelName} could not be deleted`
      );
    } catch (error) {
      return HelperMethods.serverError(res, error.message);
    }
  };
}

export default CrudController;
