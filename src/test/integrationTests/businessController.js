import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../index";
import { Business } from "../../models";

chai.use(chaiHttp);
const { expect } = chai;
const resetData = async () => {
  await Business.deleteMany({ businessName: "holitelo" });
};
resetData();
let business_id;
describe("Integration tests for the business controller", () => {
  describe("Test the creation of new businesses", () => {
    it("The value of success should be true", async () => {
      const response = await chai.request(app).post("/api/v1/business").send({
        businessName: "holitelo",
        businessDescription: "sample business description",
      });
      expect(response.body).to.have.property("success");
      expect(response.body.success).to.equal(true);
      business_id = response.body.business._id;
    });
  });

  describe("Test the creation an existing business", () => {
    it("It should return false if creating an existing business is attempted", async () => {
      const response = await chai.request(app).post("/api/v1/business").send({
        businessName: "holitelo",
        businessDescription: "sample business description",
      });
      expect(response.body).to.have.property("success");
      expect(response.body.success).to.equal(false);
    });
  });
  describe("Test the fetching of all businesses", () => {
    it("It should return an array of all businesses", async () => {
      const response = await chai.request(app).get("/api/v1/businesses");
      expect(response.body).to.have.property("success");
      expect(response.body.success).to.equal(true);
    });
  });
  describe("Test the fetching of one business businesses", () => {
    it("It should return one business", async () => {
      const response = await chai
        .request(app)
        .get(`/api/v1/business/${business_id}`);
      expect(response.body).to.have.property("success");
      expect(response.body.success).to.equal(true);
    });
  });
  describe("Test for updating a business", () => {
    it("It should update one business", async () => {
      const response = await chai
        .request(app)
        .patch(`/api/v1/business/${business_id}`).send({businessName:"Christian"});
        console.log(response.body)
      expect(response.body).to.have.property("success");
      expect(response.body.success).to.equal(true);
    });
  });
  describe("Test for deleting a business", () => {
    it("It should delete one business", async () => {
      const response = await chai
        .request(app)
        .delete(`/api/v1/business/${business_id}`);
        console.log(response.body)
      expect(response.body).to.have.property("success");
      expect(response.body.success).to.equal(true);
    });
  });
});
