import  express from 'express'
import { getwhykeith, Whykeith } from '../../Controllers/About/whyKeith.js';
const whykeithRouter=express.Router();
whykeithRouter.post('/create',Whykeith);
whykeithRouter.get('/getwhykeith',getwhykeith);
export default whykeithRouter;