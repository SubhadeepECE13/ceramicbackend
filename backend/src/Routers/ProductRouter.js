import express from 'express';
import upload from '../Config/multerConfig.js';
import { AddProduct, deleteproduct, EditProductById, Getallproucts } from '../Controllers/Homepagedynamic/Products.js';
const PrdouctRouter=express.Router();
PrdouctRouter.post('/create',upload.single('image'),AddProduct);
PrdouctRouter.post('/Edit/:id',upload.single('image'),EditProductById);
PrdouctRouter.delete('/delete/:id',deleteproduct)
PrdouctRouter.get('/getallproducts',Getallproucts);

export default PrdouctRouter;