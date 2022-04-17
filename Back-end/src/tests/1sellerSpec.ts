import supertest from "supertest";
import app from "../server";
import { Seller_Account_Control } from "../model/Seller Control Model";

const request = supertest(app);
const seller = new Seller_Account_Control();

describe("Check seller EndPoint: ", () => {
  it('The connection to the endpoint "/getusers" has been successful.', async () => {
    async () => {
      const response = await request.post("/getusers");
      expect(response.status).toBe(200);
    };
  });
});

describe("Check all user function: ", () => {
  it("getUsers function has been defined", () => {
    expect(seller.getUsers).toBeDefined();
  });
});

describe("Check user database action: ", () => {
  it("Database action to '/getusers' Get users correctly .", async () => {
    const result = await seller.getUsers({
      responsibility: "Customer",
      from: 1,
      count: 1,
    });
    expect(result.error).toEqual(false);
  });

  it("Database action to '/getusers', Error 404.", async () => {
    const result = await seller.getUsers({
      responsibility: "Admin",
      from: 10,
      count: 1,
    });
    expect(result.error).toEqual(true);
  });
});
