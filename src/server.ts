import express from "express";
import router from "./router";

import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*app.use("/", (req, res) => {
  res.json({ message: "product" });
});*/
app.use("/api", router);

export default app;
