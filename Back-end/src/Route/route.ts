import userEndPoint from "../handeler/user_handerler";
import { Application } from "express";

// Route function to hold all endpoint
const route = (app: Application) => {
  userEndPoint(app);
};

export default route;
