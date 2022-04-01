import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRS_HOST,
  POSTGRS_DB,
  POSTGRS_DB_TEST,
  POSTGRS_USER,
  POSTGRS_PASSWORD,
  ENV,
  PORT,
} = process.env;

let Client: Pool;

if (ENV === "dev") {
  Client = new Pool({
    port: PORT as unknown as number,
    host: POSTGRS_HOST,
    database: POSTGRS_DB,
    user: POSTGRS_USER,
    password: POSTGRS_PASSWORD,
  });
} else {
  Client = new Pool({
    port: PORT as unknown as number,
    host: POSTGRS_HOST,
    database: POSTGRS_DB_TEST,
    user: POSTGRS_USER,
    password: POSTGRS_PASSWORD,
  });
}

export default Client;
