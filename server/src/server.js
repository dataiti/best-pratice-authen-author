import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "~/configs/envConfig";
import { CONNECT_DATABASE } from "~/configs/mongodbConfig";
import { corsOptions } from "~/configs/corsConfig";
import { APIs_V1 } from "~/routes/v1";
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware";

const START_SERVER = () => {
  const app = express();

  app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  });

  app.use(cookieParser());

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use("/api/v1", APIs_V1);

  app.use(errorHandlingMiddleware);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log("✅ Server running on port " + env.APP_PORT);
  });
};

(async () => {
  try {
    await CONNECT_DATABASE();
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
