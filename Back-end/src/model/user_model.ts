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
  // Check if user's email is already in database or Not
  async emailExist(email: string): Promise<string> {
    const checkEmailSql = "SELECT email FROM user_shop WHERE email=($1);";
    const conn = await Client.connect();
    const result = await conn.query(checkEmailSql, [email]);
    conn.release();
    return result as unknown as string;
  }

  // Connect to database and send user data
  async addUser(newUser: Add_User_Type) {
    try {
      // Var to hold boolen value to determine if user exist or not
      let found;
      // take value from emailExist function
      await this.emailExist(newUser.email).then(function (res) {
        if (JSON.parse(JSON.stringify(res)).rows.length === 0) {
          found = true;
        } else {
          found = false;
        }
      });
      // if data not found in database add user
      if (found == true) {
        const hash = bcrypt.hashSync(
          newUser.password + BCRYPT_PASSWORD,
          parseInt(SALT_ROUNDS as string)
        );
        const insertUserSql =
          "INSERT INTO user_shop(first_name,last_name,email,password,responsibility,status) VALUES($1,$2,$3,$4,$5,$6)";
        const conn = await Client.connect();
        await conn.query(insertUserSql, [
          newUser.firstName,
          newUser.lastName,
          newUser.email,
          hash,
          newUser.responsibility,
          `Pending`,
        ]);
        conn.release();
        return {
          response_msg:
            "The registration process was successful, please activate your account.",
          error: false,
        };
      } else {
        return {
          response_msg: "This email is already in our database.",
          error: true,
        };
      }
    } catch (err) {
      return {
        response_msg:
          "The format of the data you are trying to send is the wrong format",
        error: true,
      };
    }
  }
}
