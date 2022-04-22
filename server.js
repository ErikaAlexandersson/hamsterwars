import express from "express";
import cors from "cors";
import path from "path";

import { fileURLToPath } from "url";

import hamstersRouter from "./routes/hamster.js";
import winners from "./routes/winners.js";
import loosers from "./routes/loosers.js";
import matches from "./routes/matches.js";
import matchWinners from "./routes/matchWinners.js";
// import addScript from "./routes/addScript.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 1337;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Logger: ${req.method} ${req.url}`, req.body);
  next();
});

const sendFile = path.join(__dirname, "public");

app.use(express.static(sendFile));
app.use("/hamsters", hamstersRouter);
app.use("/winners", winners);
app.use("/matches", matches);
app.use("/matchWinners", matchWinners);
app.use("/losers", loosers);
// app.use("/addAll", addScript);

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
