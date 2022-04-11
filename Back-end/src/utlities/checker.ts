import jwt, { JwtPayload } from "jsonwebtoken";
import Client from "../database";
import bcrypt from "bcrypt";

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

// Checker Calss
export class Checker_Class {
  // Check if user authorized or not
  authorization = async (authHeader: string) => {
    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, process.env.SECRET_KEY as string);
      this.checkToken(authHeader);
      return true;
    } catch {
      return false;
    }
  };

  // Check if user's email is already in database or Not & status of account
  async accountExist(email?: string, id?: number) {
    const checkEmailSql =
      "SELECT id,first_name,last_name,email,status,restrictions FROM user_shop WHERE email=($1) OR id=($2);";
    const conn = await Client.connect();
    const result = await conn.query(checkEmailSql, [email, id]);
    conn.release();
    return result;
  }

  // Check token still working or not
  async checkToken(token: string) {
    try {
      const sql = "SELECT * FROM user_shop WHERE jwt=($1);";
      const conn = await Client.connect();
      const result = await conn.query(sql, [token.split(" ")[1]]);
      conn.release();
      if (result.rows.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch {
      console.log("Token Error.");
    }
  }

  // Check password vaild or not
  hashPass(pass: string) {
    return bcrypt.hashSync(
      pass + BCRYPT_PASSWORD,
      parseInt(SALT_ROUNDS as string)
    );
  }

  // Check User using id
  async checkID(id: number) {
    const sqlCheckId = "SELECT id FROM user_shop WHERE id=($1)";
    const conn = await Client.connect();
    const result = await conn.query(sqlCheckId, [id]);
    conn.release();
    return result.rows[0].id;
  }
}
