import userEndPoint from "../handeler/user_handerler";
import { Application } from "express";
import swagger from "../utlities/swagger doc";
import sellerEndpoint from "../handeler/Seller Control handeler";
import categoryDEndpoints from "../handeler/category-D-handeler";
import uploadContantEndpoint from "../handeler/UploadFiles";

// Route function to hold all endpoint
const route = (app: Application) => {
  userEndPoint(app);
  swagger(app);
  sellerEndpoint(app);
  categoryDEndpoints(app);
  uploadContantEndpoint(app);
};

export default route;
