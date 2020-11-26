import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../index";
import { Review } from "../../models";

chai.use(chaiHttp);
const { expect } = chai;
const resetData = async () => {
  await Review.deleteMany();
};
resetData();
const businessId = "5fbe380d7a5e2ed4b39532de";
const userId = "5fbdafc99c81050a4c6ac1f2";
let review_id;
describe("Integration test for reviews", () => {
  describe("Test the creation of a review", () => {
    it("The value of success should be true", async () => {
      const response = await chai.request(app).post("/api/v1/review").send({
        user: userId,
        business: businessId,
        comment: "sample comment",
      });
      expect(response.body).to.have.property("success");
      expect(response.body.success).to.equal(true);
      review_id = response.body.review._id;
    });
  });

  describe("Test multiple review for a single company", () => {
    it("It should return false if a user reviews the same company", async () => {
      const response = await chai.request(app).post("/api/v1/review").send({
        user: userId,
        business: businessId,
        comment: "sample comment",
      });
      expect(response.body).to.have.property("success");
      expect(response.body.success).to.equal(false);
    });
  });
  describe("Test the fetching of all reviews", () => {
    it("It should return an array of all reviews", async () => {
      const response = await chai.request(app).get("/api/v1/reviews");
      expect(response.body).to.have.property("success");
      expect(response.body.success).to.equal(true);
    });
  });
  describe("Test the fetching of all reviews for a particular business", () => {
    it("It should return an array of all reviews for a particular business", async () => {
      const response = await chai
        .request(app)
        .get(`/api/v1/reviews/${businessId}`);
      expect(response.body).to.have.property("success");
      expect(response.body.success).to.equal(true);
    });
  });
  describe("Test the fetching of one review", () => {
    it("It should return one review", async () => {
      const response = await chai
        .request(app)
        .get(`/api/v1/review/${review_id}`);
      expect(response.body).to.have.property("success");
      expect(response.body.success).to.equal(true);
    });
  });
  describe("Test for updating a review", () => {
    it("It should update one review", async () => {
      const response = await chai
        .request(app)
        .patch(`/api/v1/review/${review_id}`)
        .send({ comment: "this is a sample comment" });
      expect(response.body).to.have.property("success");
      expect(response.body.success).to.equal(true);
    });
  });
  describe("Test for deleting a review", () => {
    it("It should delete one review", async () => {
      const response = await chai
        .request(app)
        .delete(`/api/v1/review/${review_id}`);
      console.log(response.body);
      expect(response.body).to.have.property("success");
      expect(response.body.success).to.equal(true);
    });
  });
});
