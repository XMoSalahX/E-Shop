import e, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Error } from "../utlities/error_response";
import Client from "../database";

const error = new Error();

// middleware to check admin or seller role
const authorizationSA = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if user authorized or not
  const { authorization } = req.headers;
  if (authorization == undefined) {
    res.status(401).send(error.error_401);
  } else {
    const authHeader = authorization as string;
    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, process.env.SECRET_KEY as string);
      const sql =
        "SELECT * FROM user_shop WHERE jwt=($1) AND responsibility='Admin'OR responsibility='Seller';";
      const conn = await Client.connect();
      const result = await conn.query(sql, [token]);
      conn.release();
      if (result.rows.length > 0) {
        next();
      } else {
        res.status(401).send(error.error_401);
      }
    } catch {
      res.status(401).send(error.error_401);
    }
  }
};

export default authorizationSA;
