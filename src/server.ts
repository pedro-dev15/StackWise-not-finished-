import express, { json, Router } from 'express';

const app = express();

//medlliwares
app.use(json());
app.use(Router);

//listen
app.listen(3000, () => {
    console.log("Server Running on port 3000. http://localhost:3000")
});