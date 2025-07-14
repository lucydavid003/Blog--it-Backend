import cloudinary from '../utils/cloudinary';
import { Request, Response } from 'express';
import fs from 'fs';

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'blog_images',
    });

    res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
};
