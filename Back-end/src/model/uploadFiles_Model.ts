import Client from "../database";
import { Error } from "../utlities/error_response";

const error = new Error();

// Class to contan constractor functions to contorle upload and remove image
export class Upload_Class {
  // control upload file
  async insertPathInArray(table: string, name: string, path: string) {
    try {
      var targetTable;
      if ((table as string) == "category") {
        targetTable = "Category_D";
      } else {
        targetTable = "Category_D";
      }

      const sql = `UPDATE ${targetTable} SET path = array_prepend($1, path) WHERE name=($2);`;
      const conn = await Client.connect();
      await conn.query(sql, [path, name]);
      conn.release();
      return {
        error: false,
        response_msg: "The file has been uploaded successfully.",
      };
    } catch {
      return error.error_400;
    }
  }
}
