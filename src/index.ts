import express, { Express } from "express";

import cors from "cors";

import  CookieParser from "cookie-parser";
import authRouter from "../Routes/auth.routes";
import blogsRouter from "../Routes/blog.routes";
import userRouter from "../Routes/user.routes"

import cookieParser from "cookie-parser";



const app: Express = express();
app.use(express.json());
app.use (cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    
    credentials:true
  })
);

app.get("/", (_req, res) => {
  res.send("<h1>welcome to blogs Apis</h1>");
});

app.use("/auth", authRouter);
app.use("/blogs", blogsRouter);
app.use("/users",userRouter)



const port = process.env.PORT || 4000;
app.listen(port, () => console.log("App is live on port ${4000}"));
