import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const client =new PrismaClient()
 async function checkUserNameAndEmailReuse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userName, emailAddress} = req.body;

  const userWithuserName = await client.user.findFirst({
    where: { userName },
  });

  if (userWithuserName) {
    res.status(400).json({ message: "Username already in use" });
    return 
  }

  const userWithEmail = await client.user.findFirst({
    where: { emailAddress },
  });

  if (userWithEmail) {
    res.status(400).json({ message: "Email already in use" });
    return 
  }

  next();
}

export default checkUserNameAndEmailReuse;