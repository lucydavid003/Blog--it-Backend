import express from 'express';
import multer from 'multer';
import { uploadImage } from '../Controllers/upload.controllers';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 

router.post('/upload', upload.single('image'), uploadImage);

export default router;
