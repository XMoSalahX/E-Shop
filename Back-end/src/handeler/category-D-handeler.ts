import express, { Application, NextFunction, Request, Response } from "express";
import { Error } from "../utlities/error_response";
import { Category_D_Class } from "../model/category-D";
import { Checker_Class } from "../utlities/checker";

const error = new Error();
const category = new Category_D_Class();
const checker = new Checker_Class();

// handel add Category to database
const addCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.query;
    if (name == undefined || description == undefined) {
      res.status(400).send(error.error_400);
    } else {
      if (req.headers.authorization == undefined) {
        res.status(401).send(error.error_401);
      } else {
        if (await checker.authorization(req.headers.authorization as string)) {
          const DBResponse = await category.addCategory(
            name as string,
            description as string
          );
          if (DBResponse.error == true) {
            res.status(409).send(DBResponse);
          } else {
            res.status(200).send(DBResponse);
          }
        } else {
          res.status(401).send(error.error_401);
        }
      }
    }
  } catch {
    res.status(500).send(error.error_500);
  }
};

const categoryDEndpoints = (app: Application) => {
  app.get("/addCategory", addCategory);
};

export default categoryDEndpoints;
