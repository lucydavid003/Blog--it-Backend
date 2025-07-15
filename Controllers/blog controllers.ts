import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const createBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, synopsis, featuredImg, content } = req.body;

    if (!title || !synopsis || !content || !req.user) {
      res
        .status(400)
        .json({ message: "All fields including image and user are required" });
      return;
    }

    const data = await client.blog.create({
      data: {
        title,
        synopsis,
        content,
        featuredImg,
        authorId: req.user.id,
      },
    });

    res.status(201).json(data);
  } catch (e) {
    console.error("Create blog error:", e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { blogId } = req.params;

    const blog = await client.blog.findFirst({
      where: { id: blogId, isDeleted: false },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Fetch Blog Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { blogId } = req.params;
    const { title, synopsis, content, featuredImg } = req.body;

    const existingBlog = await client.blog.findFirst({
      where: { id: blogId, isDeleted: false },
    });

    if (!existingBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    const updated = await client.blog.update({
      where: { id: blogId },
      data: {
        title,
        synopsis,
        content,
        featuredImg,
        updatedAt: new Date(),
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { blogId } = req.params;

    const existingBlog = await client.blog.findFirst({
      where: { id: blogId, isDeleted: false },
    });

    if (!existingBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    await client.blog.update({
      where: { id: blogId },
      data: { isDeleted: true },
    });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllBlogs = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const blogs = await client.blog.findMany({
      where: { isDeleted: false },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    const updatedBlogs = blogs.map((blog) => ({
      ...blog,
      authorName: blog.author
        ? `${blog.author.firstName ?? ""} ${blog.author.lastName ?? ""}`.trim()
        : "Unknown Author",
    }));

    res.status(200).json(updatedBlogs);
  } catch (error) {
    console.error("Fetch Blogs Error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching blogs" });
  }
};
export const getAllUserBlogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user;
    console.log("loggedin user", user);

    const blogs = await client.blog.findMany({
      where: { isDeleted: false, authorId: user.id },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Fetch Blogs Error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching blogs" });
  }
};
