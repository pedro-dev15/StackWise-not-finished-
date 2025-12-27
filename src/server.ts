import "dotenv/config";
import express from "express";
import router from "./auth/auth.routes";

export const app = express();

//middlewares
app.use(express.json());
app.use(router);

//listen
app.listen(3000, () => {
  console.log("Server Running on port 3000. http://localhost:3000");
});
