import express, { Express } from "express";

import cors from "cors";


import authRouter from "../Routes/auth.routes";
import blogsRouter from "../Routes/blog.routes";
import userRouter from "../Routes/user.routes";
import uploadRouter from "../Routes/upload.routes";

import cookieParser from "cookie-parser";



const app: Express = express();
app.use(express.json());
app.use (cookieParser());
app.use(
  cors({
    origin: ["https://blog-it-frontend-rtf7.vercel.app"],
    
    credentials:true
  })
);

app.get("/", (_req, res) => {
  res.send("<h1>welcome to blogs Apis</h1>");
});

app.use("/auth", authRouter);
app.use("/blogs", blogsRouter);
app.use("/users",userRouter)
app.use('/', uploadRouter);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log("App is live on port ${4000}"));
