import supertest from "supertest";
import app from "../server";
import { Category_D_Class } from "../model/category-D";

const request = supertest(app);
const category = new Category_D_Class();

describe("Check Category EndPoint: ", () => {
  it('The connection to the endpoint "/addCategory" has been successful.', async () => {
    async () => {
      const response = await request.post("/addCategory");
      expect(response.status).toBe(200);
    };
  });
});

describe("Check all Category function: ", () => {
  it("addCategory function has been defined", () => {
    expect(category.addCategory).toBeDefined();
  });
});

describe("Check Category database action: ", () => {
  it("Database action to '/addCategory' Add new Category correctly .", async () => {
    const result = await category.addCategory("computer", "des");
    expect(result.error).toEqual(false);
  });

  it("Database action to '/addCategory' refuse new Category correctly .", async () => {
    const result = await category.addCategory("computer", "des");
    expect(result.error).toEqual(true);
  });
});
