import userEndPoint from "../handeler/user_handerler";
import { Application } from "express";
import swagger from "../../documentation/swagger doc";

// Route function to hold all endpoint
const route = (app: Application) => {
  userEndPoint(app);
  swagger(app);
};

export default route;
