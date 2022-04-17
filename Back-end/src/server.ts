import express, { Request, Response } from "express";
import route from "./Route/route";

const app: express.Application = express();
const address: string = "http://localhost:8003";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("upload"));

app.listen(8003, function () {
  console.log(`starting app on: ${address}`);
});
//Route app to route file
route(app);

export default app;
