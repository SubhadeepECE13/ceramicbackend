import express from 'express';
import upload from '../Config/multerConfig.js';
import { EditHeroSectionofvideo, GetHerosection, HeroSection } from '../Controllers/Homepagedynamic/HeroSection.js';
import { Gettour, VideoOftour } from '../Controllers/Homepagedynamic/VideoOfTour.js.js';
// import { Gettour, VideoOftour } from '../Controllers/Homepagedynamic/VideoOfTour.js';

const HeroRouter=express.Router();
HeroRouter.post('/herovideo', upload.single('video'), HeroSection);
HeroRouter.get('/get',GetHerosection);
HeroRouter.post('/Edit',upload.single('video'), EditHeroSectionofvideo);
HeroRouter.post('/uploadvideooftour',upload.single('video'),VideoOftour);
HeroRouter.get('/tourvideo',Gettour);
export default HeroRouter;