import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import app from "../../index";
import { User } from "../../models";
import { UserController } from "../../controllers";
import { response } from "express";

chai.use(chaiHttp);
const { expect } = chai;
const deleteUsers = async () => {
  await User.deleteMany({ isSubscribed: true });
};
deleteUsers();

describe("Integration tests for the business controller", () => {
  describe("Test the creation of new businesses", () => {
    it("The value of success should be true", async () => {
      const response = await chai.request(app).post("/api/v1/business").send({
        businessName: "holitelo",
        businessDescription: "sample business description",
      });
      expect(response.body).to.have.property("success");
      expect(response.body.success).to.equal(true);
     
    });
  });

  
});
