import express, { Application, NextFunction, Request, Response } from "express";
import authorizationSA from "../middleware/authorization";
import upload from "../middleware/multer";
import checkCategoryMiddleware from "../middleware/check category d";
import { Upload_Class } from "../model/uploadFiles_Model";
import { Error } from "../utlities/error_response";

const uploadToDB = new Upload_Class();
const error = new Error();

// Handel upload file request
const uploadFile = async (req: Request, res: Response) => {
  try {
    const { errorMulter, name, location, imageName } = req.body;
    if (errorMulter != undefined) {
      res.status(400).send(error.error_400);
    } else {
      const resultFromDB = await uploadToDB.insertPathInArray(
        location,
        name,
        imageName
      );
      if (resultFromDB.error == true) {
        res.status(400).send(error.error_400);
      } else {
        res.status(200).send(resultFromDB);
      }
    }
  } catch {
    res.status(500).send(error.error_500);
  }
};

const uploadContantEndpoint = (app: Application) => {
  app.post(
    "/upload",
    authorizationSA,
    upload,
    checkCategoryMiddleware,
    uploadFile
  );
};

export default uploadContantEndpoint;
