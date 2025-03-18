import backroundimageofyear from "../../Model/homepage/backroundmillionsyear.js";
import cloudinary from "../../Config/Cloudinary.js";
import fs from 'fs'
import exp from "constants";


export const backimageofyearsection=async(req , res)=>{
    try{
     
        const exisiting=await backroundimageofyear.findOne();
        console.log('image',req.file.path)
        if(exisiting)
        {
            const uploaded=await cloudinary.uploader.upload(req.file.path);
            fs.unlinkSync(req.file.path);


            const updated= await backroundimageofyear.findByIdAndUpdate(exisiting._id, {image:uploaded.secure_url}, {new:true});
            if(updated)
            {
                return res.status(201).json({
                    message:'Updated successfully',
                    updated,
                    success:true
                })
            }
            return res.status(401).json({
                message:'Can not update',
                success:false
            })
        }
        const uploaded=await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path);
        const crated=await backroundimageofyear.create({
            image:uploaded.secure_url
        })

        if(crated)
        {
            return res.status(201).json({
                message:'uploaded successfully',
                crated,
                success:true
            })
        }
        return res.status(401).json({
            message:' can not uploaded ',
           
            success:false
        })

    }
    catch(error)
    {
        console.log(error);
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}

export const Getbackroundimageofyearsection=async (req , res)=>{
    try{
       const video=await backroundimageofyear.findOne()
       if(!video)
       {
        return res.status(404).json({
            message:'Can not get',
            success:false
        })
       }
       return res.status(201).json(video);

    }catch(error)
    {
        console.log(error);
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}