import express from "express";
import dotenv from "./config/dotenv.js";
import database from "./config/database.js";
import apiRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";
import clientRouter from "./routes/client.route.js";

const app = express();

const port = dotenv.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine","ejs");

app.use("/",clientRouter);

app.use("/api", apiRoutes);

database()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server start on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Server failed to start: ", err.message);
  });
