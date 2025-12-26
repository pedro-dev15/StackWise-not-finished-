import express from "express";
import router from "./auth/auth.routes";

const app = express();

//middlewares
app.use(router);

//listen
app.listen(3000, () => {
  console.log("Server Running on port 3000. http://localhost:3000");
});
