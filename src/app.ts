import express, { Request, Response } from "express";
import notesRouter from "./notes/notes.routes";
import versesRouter from "./verses/verses.routes";
import usersRouter from "./users/users.routes";
import cors from "cors";
import helmet from "helmet";
import logger from "./middleware/logger.middleware";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

console.log(process.env.MY_SQL_DB_HOST);

if (process.env.NODE_ENV == "development") {
  app.use(logger);
  console.log(process.env.GREETING + " in dev mode");
}

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Welcome to the Hudson's Bible API</h1>");
});
app.use("/", [notesRouter, versesRouter, usersRouter]);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
