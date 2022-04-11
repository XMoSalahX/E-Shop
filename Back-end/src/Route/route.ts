import userEndPoint from "../handeler/user_handerler";
import { Application } from "express";
import swagger from "../../documentation/swagger doc";
import sellerEndpoint from "../handeler/Seller Control handeler";

// Route function to hold all endpoint
const route = (app: Application) => {
  userEndPoint(app);
  swagger(app);
  sellerEndpoint(app);
};

export default route;
