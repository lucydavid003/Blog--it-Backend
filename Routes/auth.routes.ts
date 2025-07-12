import { Router } from "express";

import checkUserNameAndEmailReuse from "../Middlewares/checkUserNameAndEmailReuse";
import { loginUser, registerUser } from "../Controllers/auth controllers";

const router: Router = Router();

router.post(
  "/register",
  checkUserNameAndEmailReuse,
  registerUser
);
router.post("/login",loginUser)

export default router;
