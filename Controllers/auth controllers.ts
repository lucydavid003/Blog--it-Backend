import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const client = new PrismaClient();
export const registerUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { firstName, lastName, userName, emailAddress, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.user.create({
      data: {
        firstName,
        lastName,
        userName,
        emailAddress,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    const user = await client.user.findFirst({
      where: {
        OR: [{ userName: identifier }, { emailAddress: identifier }],
      },
    });
    if (!user) {
      res.status(400).json({ message: "wrong login details" });
      return;
    }
    const passwardmatch = await bcrypt.compare(password, user.password);
    if (passwardmatch === false) {
      res.status(400).json({ message: "wrong login details" });
      return;
    }
const {password:userpassword, updatedAt,dateJoined, ... userDetails} = user;
 const token= jwt.sign(userDetails, process.env.JWT_SECRET!)
 console.log("token", token)
  res.cookie("authToken", token,{httpOnly:true,secure:true,sameSite:"none"}).json(userDetails)
  } 
  catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
