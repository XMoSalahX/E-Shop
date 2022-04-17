import supertest from "supertest";
import app from "../server";
import { Upload_Class } from "../model/uploadFiles_Model";

const request = supertest(app);
const uploadFile = new Upload_Class();

describe("Check Category EndPoint: ", () => {
  it('The connection to the endpoint "/upload" has been successful.', async () => {
    async () => {
      const response = await request.post("/upload");
      expect(response.status).toBe(200);
    };
  });
});

describe("Check all Category function: ", () => {
  it("addCategory function has been defined", () => {
    expect(uploadFile.insertPathInArray).toBeDefined();
  });
});

describe("Check Category database action: ", () => {
  it("Database action to '/upload' Add new Category correctly .", async () => {
    const result = await uploadFile.insertPathInArray(
      "category",
      "computer",
      "x"
    );
    expect(result.error).toEqual(false);
  });
});
