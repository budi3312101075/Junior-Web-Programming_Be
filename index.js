import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { scheduleJob } from "node-schedule";
import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { fileDir } from "./utils/file_handler.cjs";

const totalCPU = availableParallelism();

if (cluster.isMaster) {
  for (let i = 0; i < totalCPU; i++) {
    cluster.fork();

    if (i === 1) {
      scheduleJob("0 1 * * *", async function () {});
    }
  }
} else {
  startExpress();
}

function startExpress() {
  dotenv.config();
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS,
      credentials: true,
    })
  );

  app.use(express.static(fileDir()));
  app.use(cookieParser());
  app.use(express.json());
  app.use(routes);

  app.listen(process.env.APP_PORT, () => {
    console.log(
      `⚡️[server]: Server is running at http://localhost:${process.env.APP_PORT}`
    );
  });
}
