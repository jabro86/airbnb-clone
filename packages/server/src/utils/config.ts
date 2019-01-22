import * as dotenv from "dotenv";

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/../../.env.test`;
    break;
  case "production":
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path });

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FRONTEND_HOST = process.env.FRONTEND_HOST;
const REDIS_URL = process.env.REDIS_URL;
const DATABASE_URL = process.env.DATABASE_URL;

export { FRONTEND_HOST, SENDGRID_API_KEY, REDIS_URL, DATABASE_URL };
