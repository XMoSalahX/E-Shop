import Client from "../database";
import { Error } from "../utlities/error_response";
import { Checker_Class } from "../utlities/checker";

const error = new Error();
const checker = new Checker_Class();

export class Category_D_Class {
  // Add new category to category table
  async addCategory(name: string, description: string) {
    try {
      if (await checker.checkCategory(name, "category")) {
        return error.error_409;
      } else {
        const conn = await Client.connect();
        const sql =
          'INSERT INTO Category_D("name","description","path") VALUES($1,$2,$3);';
        await conn.query(sql, [name, description, []]);
        conn.release();
        return {
          error: false,
          response_msg: "A new section has been added successfully.",
        };
      }
    } catch {
      return error.error_400;
    }
  }
}
