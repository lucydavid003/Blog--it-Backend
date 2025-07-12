import express from "express";
import { updateUserPassword,getUserProfile } from "../Controllers/user.controllers"
import{updateUserInfo} from "../Controllers/user.controllers"
import verifyUser from "../Middlewares/verifyUser";

const router = express.Router();


router.get("/me", verifyUser, getUserProfile);


router.patch("/", verifyUser, updateUserInfo);


router.patch("/password", verifyUser, updateUserPassword);

export default router;
