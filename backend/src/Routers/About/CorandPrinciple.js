import express from 'express'
import upload from '../../Config/multerConfig.js'
import { CoreAndprinciple, EditCoreandprinciple, getallcorandprinciple } from '../../Controllers/About/CoreAndPriciple.js';

const CoreAndPricipleRouter=express.Router();
CoreAndPricipleRouter.post('/create', upload.single('image'), CoreAndprinciple);
CoreAndPricipleRouter.get('/getall',getallcorandprinciple);
CoreAndPricipleRouter.post('/Edit/:id', upload.single('image'), EditCoreandprinciple);

export default CoreAndPricipleRouter;