import { type } from "os";
import Client from "../database";
import bcrypt from "bcrypt";

export type Add_User_Type = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  responsibility: string;
  status?: string;
};

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

// Class Contain all User Function
export class User_Class {
  // Check if user's email is already in database or Not & status of account
  async emailExist(email: string): Promise<string> {
    const checkEmailSql =
      "SELECT email,id FROM user_shop WHERE email=($1) AND status=($2);";
    const conn = await Client.connect();
    const result = await conn.query(checkEmailSql, [email, "Pending"]);
    conn.release();
    return result as unknown as string;
  }

  // Connect to database and send user data
  async addUser(newUser: Add_User_Type) {
    try {
      // Var to hold boolen value to determine if user exist or not
      let found;
      // Exist User id
      let idFromUser;
      // take value from emailExist function
      await this.emailExist(newUser.email).then(function (res) {
        if (JSON.parse(JSON.stringify(res)).rows.length === 0) {
          found = true;
        } else {
          found = false;
          idFromUser = JSON.parse(JSON.stringify(res)).rows[0].id;
        }
      });
      // if data not found in database add user
      if (found == true) {
        const hash = bcrypt.hashSync(
          newUser.password + BCRYPT_PASSWORD,
          parseInt(SALT_ROUNDS as string)
        );
        const insertUserSql =
          "INSERT INTO user_shop(first_name,last_name,email,password,responsibility,status,restrictions,jwt) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id";
        const conn = await Client.connect();
        const result = await conn.query(insertUserSql, [
          newUser.firstName,
          newUser.lastName,
          newUser.email,
          hash,
          newUser.responsibility,
          `Pending`,
          `Nothing`,
          null,
        ]);
        conn.release();
        return {
          response_msg:
            "The registration process was successful, please activate your account.",
          error: false,
          status: 200,
          id: result.rows[0].id,
        };
      } else {
        return {
          response_msg: "This email is already in our database.",
          error: true,
          status: 200,
          id: idFromUser,
        };
      }
    } catch (err) {
      return {
        response_msg:
          "The format of the data you are trying to send is the wrong format.",
        error: true,
      };
    }
  }

  // Check User using id
  async checkID(id: number) {
    const sqlCheckId = "SELECT id FROM user_shop WHERE id=($1)";
    const conn = await Client.connect();
    const result = await conn.query(sqlCheckId, [id]);
    conn.release();
    return result.rows[0].id;
  }

  // Convert acc account statues form Pending to Active
  async activeUser(id: number) {
    try {
      await this.checkID(id);
      const sqlActiveAcc = "UPDATE user_shop SET status='Active' WHERE id=($1)";
      const conn = await Client.connect();
      await conn.query(sqlActiveAcc, [id]);
      conn.release();
      return {
        error: false,
        response_msg: "Your account has been activated",
      };
    } catch (err) {
      return {
        error: true,
        response_msg:
          "This account is not in the database, please sign up first.",
      };
    }
  }

  // auth user account
  async auth(email: string, password: string) {
    try {
      const sqlAuth =
        "SELECT password FROM user_shop WHERE email=($1) AND status=($2) AND restrictions=($3)";
      const conn = await Client.connect();
      const result = await conn.query(sqlAuth, [email, "Active", "Nothing"]);
      conn.release();
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return user;
        }
      }
      return "null";
    } catch {
      return {
        response_msg:
          "The format of the data you are trying to send is the wrong format.",
        error: true,
      };
    }
  }

  // Set temporary token in database "1 hour"
  async settocken(token: string, email: string) {
    try {
      const sqltoken = "UPDATE user_shop SET jwt=($1) WHERE email=($2)";
      const conn = await Client.connect();
      await conn.query(sqltoken, [token, email]);
      conn.release();
      setTimeout(async () => {
        const conn = await Client.connect();
        await conn.query(sqltoken, [null, email]);
        conn.release();
      }, 3600000);
    } catch {
      return {
        response_msg:
          "The format of the data you are trying to send is the wrong format.",
        error: true,
      };
    }
  }
}
