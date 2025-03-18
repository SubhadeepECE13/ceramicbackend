import express from 'express'
import upload from '../Config/multerConfig.js'
import { certificate, deleteCertificate, editCertificate, getallcertificate } from '../Controllers/Homepagedynamic/certificate.js';
const certificateRouter=express.Router();
certificateRouter.post('/post', upload.single('image'), certificate)
certificateRouter.get('/getall',getallcertificate);
certificateRouter.put('/Edit/:id',upload.single('image'),editCertificate);
certificateRouter.delete('/Delete/:id',deleteCertificate);
export default certificateRouter;