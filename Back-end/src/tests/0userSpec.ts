import supertest from "supertest";
import app from "../server";
import { User_Class } from "../model/user_model";
import { Checker_Class } from "../utlities/checker";

const request = supertest(app);
const user = new User_Class();
const checker = new Checker_Class();

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
  it('The connection to the endpoint "/changepassword" has been successful.', async () => {
    async () => {
      const response = await request.put("/changepassword");
      expect(response.status).toBe(200);
    };
  });
});

describe("Check all user function: ", () => {
  it("emailExist function has been defined", () => {
    expect(checker.accountExist).toBeDefined();
  });

  it("addUser function has been defined", () => {
    expect(user.addUser).toBeDefined();
  });

  it("checkID function has been defined", () => {
    expect(checker.checkID).toBeDefined();
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

  it("hashPass function has been defined", () => {
    expect(checker.hashPass).toBeDefined();
  });
  it("hasChangePasswordhPass function has been defined", () => {
    expect(user.ChangePassword).toBeDefined();
  });
});

describe("Check user database action: ", () => {
  it('Database action to the endpoint "/createuser" has been successful.', async () => {
    const result = await user.addUser({
      firstName: "Mohammed",
      lastName: "Salah",
      email: "mohammedsalah6055@gmail.com",
      password: "Mohammed123#",
      responsibility: "Admin",
    });
    expect(result.error).toEqual(false);
  });

  it('Database action to the endpoint "/createuser", Check Error 400 logic.', async () => {
    const result = await user.addUser({
      firstName: "Mohammed",
      lastName: "Salah",
      email: "mohammedsalah6055@gmail.com",
      password: "Mohammed123#",
      responsibility: "Admin",
    });
    expect(result.status).toEqual("Pending");
  });

  it("Database action to 'emailExist' function got the correct answer using 'email'.", async () => {
    const result = await checker.accountExist("mohammedsalah6055@gmail.com");
    expect(result.rows.length).toEqual(1);
  });

  it("Database action to 'emailExist' function got the correct answer using 'id'.", async () => {
    const result = await checker.accountExist(undefined, 1);
    expect(result.rows.length).toEqual(1);
  });

  it("Database action to 'activeUser' function got the correct answer.", async () => {
    const result = await user.activeUser(1);
    expect(result.error).toEqual(false);
  });

  it("Database action to 'activeUser' function, Error 404.", async () => {
    const result = await user.activeUser(100);
    expect(result.status).toEqual(404);
  });

  it("Database action to 'auth' function got the correct answer.", async () => {
    const result = await user.auth(
      "mohammedsalah6055@gmail.com",
      "Mohammed123#"
    );
    expect(result.email).toEqual("mohammedsalah6055@gmail.com");
  });

  it("Database action to 'auth' function got not the correct answer.", async () => {
    const result = await user.auth(
      "mohammedsalah605ss5@gmail.com",
      "Mohammed123#"
    );
    expect(result.status).toEqual(404);
  });

  it("Database action to 'setUniqueID' function got the correct answer.", async () => {
    const result = await user.setUniqueID(
      "dgasgasgasg",
      "mohammedsalah6055@gmail.com"
    );
    expect(result.error).toEqual(false);
  });

  it("Database action to 'setUniqueID' function not found user.", async () => {
    const result = await user.setUniqueID(
      "dgasgasgasg",
      "mohammedsalah605s5asdas@gmail.com"
    );
    expect(result.status).toEqual(404);
  });

  it("Database action to '/changepassword' Password has been updated .", async () => {
    const result = await user.ChangePassword("dgasgasgasg", "mosa");
    expect(result.error).toEqual(false);
  });

  it("Database action to '/changepassword' Password has not been updated .", async () => {
    const result = await user.ChangePassword("dgasgasgasg", "mosa");
    expect(result.error).toEqual(true);
  });
});
