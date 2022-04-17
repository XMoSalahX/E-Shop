import { type } from "os";
import Client from "../database";
import { Error } from "../utlities/error_response";

const error = new Error();

export type Seller_Account_Control_Type = {
  responsibility: string;
  from: number;
  count: number;
};

export class Seller_Account_Control {
  // Get user from database
  async getUsers(S: Seller_Account_Control_Type) {
    try {
      if (
        S.responsibility != undefined &&
        S.count != undefined &&
        S.from != undefined
      ) {
        const sqlGetUsers = `SELECT id,first_name,last_name,email,status,restrictions FROM user_shop WHERE responsibility=($1) AND id>=($3) LIMIT ($2)`;
        const conn = await Client.connect();
        const result = await conn.query(sqlGetUsers, [
          S.responsibility,
          S.count,
          S.from,
        ]);
        conn.release();
        if (result.rows.length > 0) {
          return { error: false, data: result.rows };
        } else {
          return error.error_404;
        }
      } else {
        return error.error_400;
      }
    } catch {
      return error.error_400;
    }
  }
}
