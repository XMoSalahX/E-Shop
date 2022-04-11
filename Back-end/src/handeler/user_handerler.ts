import express, { Application, Request, Response } from "express";
import { userInfo } from "os";
import { Add_User_Type, User_Class } from "../model/user_model";
import mailer from "../utlities/mail controler";
import jwt from "jsonwebtoken";
import uniqID from "uniqid";
import { verify } from "crypto";
import { Error } from "../utlities/error_response";

const user = new User_Class();
const error = new Error();

// Creat User Handeler
const createUser = async (req: Request, res: Response) => {
  try {
    //Object we will send to datbase
    const userData: Add_User_Type = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      responsibility: req.body.responsibility,
    };
    const new_User = await user.addUser(userData);
    if (new_User.status == "Pending") {
      mailer(userData.email, new_User.id, "verify");
    }
    if (new_User.error == false) {
      res.status(200).json(new_User);
    } else {
      res.status(400).json(new_User);
    }
  } catch (err) {
    res.status(500).json(error.error_500);
  }
};

// Verification handeler
const emailerify = async (req: Request, res: Response) => {
  try {
    if (!isNaN(req.params.id as unknown as number)) {
      const confirm = await user.activeUser(Number(req.params.id));
      console.log(confirm);
      if (confirm.error == false) {
        res.status(200).json(confirm);
      } else {
        res.status(404).json(confirm);
      }
    } else {
      res.status(400).json(error.error_400);
    }
  } catch {
    res.status(500).json(error.error_500);
  }
};

// Login to User Account
const login = async (req: Request, res: Response) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };
    const resFromModel = await user.auth(data.email, data.password);
    if (resFromModel.email || resFromModel.status == 404) {
      if (resFromModel.status != 404) {
        const token = jwt.sign(
          { user: resFromModel },
          process.env.SECRET_KEY as string
        );
        await user.settocken(token, data.email);
        res.status(200).json({
          error: false,
          accessToken: token,
        });
      } else if (resFromModel.status == 404) {
        res.status(404).json(error.error_404);
      }
    } else {
      res.status(400).json(error.error_400);
    }
  } catch {
    res.status(500).json(error.error_500);
  }
};

// Send forget password email
const forgetPassword = async (req: Request, res: Response) => {
  try {
    let id = uniqID();
    const responseDB = await user.setUniqueID(id, req.body.email);
    if (responseDB.error == false) {
      await mailer(req.body.email, id as string, "forget");
      res.status(200).json({
        error: false,
        response_msg: "The message has been sent successfully.",
      });
    } else if (responseDB.status == 404) {
      res.status(404).json(responseDB);
    } else {
      res.status(400).json(responseDB);
    }
  } catch {
    res.status(500).json(error.error_500);
  }
};

// Change user password
const changePassword = async (req: Request, res: Response) => {
  try {
    const dbResponse = await user.ChangePassword(
      req.body.uniq,
      req.body.password
    );
    if (dbResponse.error == true) {
      if (dbResponse.status == 404) {
        res.status(404).json(dbResponse);
      } else {
        res.status(400).json(dbResponse);
      }
    } else {
      res.status(200).json(dbResponse);
    }
  } catch {
    res.status(500).json(error.error_500);
  }
};

// Route User EndPoint
const userEndPoint = (app: Application) => {
  app.post("/createuser", createUser);
  app.put("/verify/:id", emailerify);
  app.put("/login", login);
  app.put("/forgetpassword", forgetPassword);
  app.put("/changepassword", changePassword);
};

export default userEndPoint;
