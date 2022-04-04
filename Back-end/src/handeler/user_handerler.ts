import express, { Application, Request, Response } from "express";
import { userInfo } from "os";
import { Add_User_Type, User_Class } from "../model/user_model";
import mailer from "../utlities/mail controler";
import jwt from "jsonwebtoken";
import uniqID from "uniqid";
import { verify } from "crypto";
const user = new User_Class();

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
    if (new_User.error === false) {
      mailer(userData.email, new_User.id, "verify");
    } else {
      mailer(userData.email, new_User.id, "verify");
    }
    res.json(new_User);
  } catch (err) {
    res.status(500).json({
      error: true,
      response_msg: "Server Error Contact Administrator.",
    });
  }
};

// Verification handeler
const emailerify = async (req: Request, res: Response) => {
  try {
    const confirm = await user.activeUser(Number(req.params.id));
    res.json(confirm);
  } catch {
    res.status(500).json({
      error: true,
      response_msg: "Server Error Contact Administrator.",
    });
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
    if (!resFromModel.error || resFromModel == "null") {
      if (resFromModel !== "null") {
        const token = jwt.sign(
          { user: resFromModel },
          process.env.SECRET_KEY as string
        );
        await user.settocken(token, data.email);
        res.json({
          error: false,
          accessToken: token,
        });
      } else {
        res.status(404).json({
          error: true,
          response_msg:
            "This account is not in the database, please sign up first.",
        });
      }
    }
  } catch {
    res.status(500).json({
      error: true,
      response_msg: "Server Error Contact Administrator.",
    });
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
    res.status(500).json({
      error: true,
      response_msg: "Server Error Contact Administrator.",
    });
  }
};

// Route User EndPoint
const userEndPoint = (app: Application) => {
  app.post("/createuser", createUser);
  app.put("/verify/:id", emailerify);
  app.post("/login", login);
  app.put("/forgetpassword", forgetPassword);
};

export default userEndPoint;
