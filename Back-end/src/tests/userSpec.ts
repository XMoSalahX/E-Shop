import supertest from "supertest";
import app from "../server";
import { User_Class } from "../model/user_model";

const request = supertest(app);
const user = new User_Class();

describe("Check user EndPoint: ", () => {
  it('The connection to the endpoint "/createuser" has been successful.', async () => {
    async () => {
      const response = await request.post("/createuser");
      expect(response.status).toBe(200);
    };
  });
});

describe("Check all user function: ", () => {
  it("emailExist function has been defined", () => {
    expect(user.emailExist).toBeDefined();
  });

  it("addUser function has been defined", () => {
    expect(user.addUser).toBeDefined();
  });
});

describe("Check user database action: ", () => {
  it('Database action to the endpoint "/createuser" has been successful.', async () => {
    const result = await user.addUser({
      firstName: "Mohammed",
      lastName: "Salah",
      email: "mohammedsalah605s5@gmail.com",
      password: "Mohammed123#",
      responsibility: "Admin",
    });
    expect(result.error).toEqual(false);
  });

  it('Database action to the endpoint "/createuser" has not been successful.', async () => {
    const result = await user.addUser({
      firstName: "Mohammed",
      lastName: "Salah",
      email: "mohammedsalah605s5@gmail.com",
      password: "Mohammed123#",
      responsibility: "Admin",
    });
    expect(result.error).toEqual(true);
  });

  it("Database action to 'emailExist' function got the correct answer.", async () => {
    const result = await user.emailExist("mohammedsalah605s5@gmail.com");
    expect(JSON.parse(JSON.stringify(result)).rows.length).toEqual(1);
  });
});