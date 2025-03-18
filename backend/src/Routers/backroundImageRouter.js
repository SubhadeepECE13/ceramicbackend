import express from 'express'
import upload from '../Config/multerConfig.js';
import { backimageofyearsection, Getbackroundimageofyearsection } from '../Controllers/Homepagedynamic/backroundimageofyearsection.js';
const backroundimageofyearRouter=express.Router();
backroundimageofyearRouter.post('/backroundimage',upload.single('image'),backimageofyearsection);
backroundimageofyearRouter.get('/get',Getbackroundimageofyearsection);
export default backroundimageofyearRouter;