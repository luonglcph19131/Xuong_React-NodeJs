import express from "express"; // module syntax
import router from "./routes";
import mongoose from "mongoose";
import cors from 'cors'
const app = express();
const port = 8080;

app.use(cors())
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/web503_01")
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Database connect failed!");
  });

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
