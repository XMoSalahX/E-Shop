import express, { Application, Request, Response } from "express";
import { Checker_Class } from "../utlities/checker";
import { Error } from "../utlities/error_response";
import {
  Seller_Account_Control,
  Seller_Account_Control_Type,
} from "../model/Seller Control Model";

const seller = new Seller_Account_Control();
const error = new Error();
const checker = new Checker_Class();

// Display user handler
const displayUsers = async (req: Request, res: Response) => {
  try {
    if (req.headers.authorization == undefined) {
      res.status(401).json(error.error_401);
    } else {
      if (await checker.authorization(req.headers.authorization as string)) {
        const data: Seller_Account_Control_Type = {
          responsibility: req.body.responsibility as string,
          from: req.body.from as number,
          count: req.body.count as number,
        };
        const dbRespons = await seller.getUsers(data);
        if (dbRespons.error == false) {
          res.status(200).json(dbRespons);
        } else {
          res.status(400).json(dbRespons);
        }
      } else {
        res.status(401).json(error.error_401);
      }
    }
  } catch {
    res.status(500).json(error.error_500);
  }
};

// Display specific user
const specificUser = async (req: Request, res: Response) => {
  try {
    if (req.body.email == undefined && req.body.id == undefined) {
      res.status(400).json(error.error_400);
    } else {
      if (isNaN(req.body.id) && req.body.id != undefined) {
        res.status(400).json(error.error_400);
      } else if (
        typeof req.body.email != "string" &&
        req.body.email != undefined
      ) {
        res.status(400).json(error.error_400);
      } else {
        if (await checker.authorization(req.headers.authorization as string)) {
          const DBResponse = await checker.accountExist(
            req.body.email,
            req.body.id
          );
          if (DBResponse.rows.length == 0) {
            res.status(404).json(error.error_404);
          } else {
            res.status(200).json({ error: false, data: DBResponse.rows[0] });
          }
        } else {
          res.status(401).json(error.error_401);
        }
      }
    }
  } catch {
    res.status(500).json(error.error_500);
  }
};

const sellerEndpoint = (app: Application) => {
  app.post("/getusers", displayUsers);
  app.post("/getuser", specificUser);
};

export default sellerEndpoint;
