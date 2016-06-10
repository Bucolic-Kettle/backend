import express from 'express';
import imageController from './image/image.controller';
import multer from 'multer';

const router = express.Router();

router.post('/upload', multer(require('../config/multer')).single('image'), imageController.create);

module.exports = router;