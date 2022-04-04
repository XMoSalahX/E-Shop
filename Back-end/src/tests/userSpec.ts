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

  it('The connection to the endpoint "/verify/:id" has been successful.', async () => {
    async () => {
      const response = await request.put("/verify/1");
      expect(response.status).toBe(200);
    };
  });

  it('The connection to the endpoint "/login" has been successful.', async () => {
    async () => {
      const response = await request.post("/login");
      expect(response.status).toBe(200);
    };
  });

  it('The connection to the endpoint "/forgetpassword" has been successful.', async () => {
    async () => {
      const response = await request.put("/forgetpassword");
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

  it("checkID function has been defined", () => {
    expect(user.checkID).toBeDefined();
  });

  it("activeUser function has been defined", () => {
    expect(user.activeUser).toBeDefined();
  });

  it("auth function has been defined", () => {
    expect(user.auth).toBeDefined();
  });

  it("settocken function has been defined", () => {
    expect(user.settocken).toBeDefined();
  });

  it("setUniqueID function has been defined", () => {
    expect(user.setUniqueID).toBeDefined();
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
    const result = await user.emailExist(
      "mohammedsalah605s5@gmail.com",
      "Pending"
    );
    expect(JSON.parse(JSON.stringify(result)).rows.length).toEqual(1);
  });

  it("Database action to 'activeUser' function got the correct answer.", async () => {
    const result = await user.activeUser(1);
    expect(result.error).toEqual(false);
  });

  it("Database action to 'activeUser' function got not the correct answer.", async () => {
    const result = await user.auth(
      "mohammedsalah605ss5@gmail.com",
      "Mohammed123#"
    );
    expect(result).toEqual("null");
  });

  it("Database action to 'setUniqueID' function got the correct answer.", async () => {
    const result = await user.setUniqueID(
      "dgasgasgasg",
      "mohammedsalah605s5@gmail.com"
    );
    expect(result.error).toEqual(false);
  });

  it("Database action to 'setUniqueID' function not found user.", async () => {
    const result = await user.setUniqueID(
      "dgasgasgasg",
      "mohammedsalah605s5asdas@gmail.com"
    );
    expect(result.error).toEqual(true);
  });
});
