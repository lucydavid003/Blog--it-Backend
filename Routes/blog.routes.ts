import { Router } from "express";
import express from "express";
import { createBlog,getBlog,updateBlog,deleteBlog, getAllBlogs, getAllUserBlogs} from "../Controllers/blog controllers";
import verifyUser from "../Middlewares/verifyUser"

const router:Router = Router ();

router.post("/", verifyUser, createBlog);
router.get("/",verifyUser, getAllBlogs);
router.get("/:blogId", getBlog);
router.get("/users/blogs",verifyUser, getAllUserBlogs);
router.patch("/:blogId",  updateBlog);
router.delete("/:blogId",  deleteBlog);

export default router;

