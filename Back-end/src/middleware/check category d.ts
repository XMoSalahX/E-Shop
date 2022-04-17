import { NextFunction, Request, Response } from "express";
import Client from "../database";
import { Error } from "../utlities/error_response";

const error = new Error();

const checkCategoryMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { name, location } = req.body;
  if (req.file == undefined || name == undefined || location == undefined) {
    res.status(400).send(error.error_400);
  } else {
    let target;
    if (location == "category") {
      target = "Category_D";
    } else {
      res.status(404).send(error.error_404);
    }
    const sql = `SELECT "name" FROM ${target} WHERE name=($1);`;
    const conn = await Client.connect();
    const result = await conn.query(sql, [name]);
    if (result.rows.length > 0) {
      next();
    } else {
      res.status(404).send(error.error_404);
    }
  }
};

export default checkCategoryMiddleware;
