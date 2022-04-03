import express, { Application, Request, Response } from "express";
import { userInfo } from "os";
import { Add_User_Type, User_Class } from "../model/user_model";

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
    res.json(new_User);
  } catch (err) {
    res.json({
      error: true,
      response_msg: "Server Error Contact Administrator.",
    });
  }
};

// Route User EndPoint
const userEndPoint = (app: Application) => {
  app.post("/createuser", createUser);
};

export default userEndPoint;
