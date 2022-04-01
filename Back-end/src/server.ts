import express, { Request, Response } from "express";

const app: express.Application = express();
const address: string = "http://localhost:8003";

app.use(express.json());

app.listen(8003, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
