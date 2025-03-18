import express from "express";
import upload from "../Config/multerConfig.js";
import { Getallmanagement, Management,deleteManagement, updateManagement } from "../Controllers/Homepagedynamic/management.js";


const managementRouter=express.Router();

managementRouter.post('/create', upload.single('image'), Management);
managementRouter.get('/getall',Getallmanagement);
managementRouter.put('/Edit/:id',updateManagement);
managementRouter.delete('/delete/:id',deleteManagement);

export default  managementRouter;