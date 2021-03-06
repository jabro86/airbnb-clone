import "dotenv/config";
import "reflect-metadata";

import * as connectRedis from "connect-redis";
import * as RateLimit from "express-rate-limit";
import * as session from "express-session";
import { GraphQLServer } from "graphql-yoga";
import * as RateLimitRedisStore from "rate-limit-redis";

import { redisSessionPrefix } from "./constants";
import { redis } from "./redis";
import { confirmEmail } from "./routes/confirmEmail";
import { createTestConn } from "./testUtils/createTestConn";
import { FRONTEND_HOST } from "./utils/config";
import { createTypeormConn } from "./utils/createTypeormConn";
import { genSchema } from "./utils/genSchema";

const SESSION_SECRET = "ajslkjalksjdfkl";
const RedisStore = connectRedis(session as any);

export const startServer = async () => {
  if (process.env.NODE_ENV === "test") {
    await redis.flushall();
  }

  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }) => ({
      redis,
      url: request.protocol + "://" + request.get("host"),
      session: request.session,
      req: request
    })
  });

  server.express.use(
    new RateLimit({
      store: new RateLimitRedisStore({
        client: redis
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );

  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix
      }),
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    } as any)
  );

  const cors = {
    credentials: true,
    origin: process.env.NODE_ENV === "test" ? "*" : FRONTEND_HOST
  };
  console.log("cors", cors);

  server.express.get("/confirm/:id", confirmEmail);

  if (process.env.NODE_ENV === "test") {
    await createTestConn(true);
  } else {
    await createTypeormConn();
  }
  const app = await server.start({
    cors,
    port: process.env.NODE_ENV === "test" ? 0 : 4000
  });
  console.log("Server is running on localhost:4000");

  return app;
};
