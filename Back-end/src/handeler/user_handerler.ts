import express, { Application, Request, Response } from "express";
import { userInfo } from "os";
import { Add_User_Type, User_Class } from "../model/user_model";
import mailVer from "../utlities/mail verification";
import jwt from "jsonwebtoken";

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
      mailVer(userData.email, new_User.id);
    } else {
      mailVer(userData.email, new_User.id);
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
const emailVerify = async (req: Request, res: Response) => {
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

// Route User EndPoint
const userEndPoint = (app: Application) => {
  app.post("/createuser", createUser);
  app.put("/verify/:id", emailVerify);
  app.post("/login", login);
};

export default userEndPoint;
