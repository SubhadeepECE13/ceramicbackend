import express from 'express'
import { Aboutinhome, GetAboutUs } from '../Controllers/Homepagedynamic/About.js';
import upload from '../Config/multerConfig.js';

const homeaboutRouter=express.Router();
homeaboutRouter.post('/content',upload.single('image'),Aboutinhome);
homeaboutRouter.get('/get',GetAboutUs);
export default homeaboutRouter;