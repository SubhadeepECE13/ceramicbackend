
import cloudinary from '../../Config/Cloudinary.js'
import fs from 'fs'
import VideoTourmodel from '../../Model/homepage/videooftour.js';
export const VideoOftour=async(req , res)=>{
    try{
        if(!req.file)
        {
            return res.status(404).json({
                message:'can not find video'
            })

        }
        const f=await VideoTourmodel.findOne();
        if(f)
        {
            const uploaded=await cloudinary.uploader.upload(req.file.path,{resource_type:'video'});
            fs.unlinkSync(req.file.path);
            const updated=await VideoTourmodel.findByIdAndUpdate(f._id,{video:uploaded.secure_url}, {new:true});
            if(updated)
            {
                return res.status(201).json({
                    message:"Updated successfully",
                    success:true 
                })
            }
            return res.status(401).json({
                message:"Can not updated",
                success:false
            })
        }
        const uploaded=await cloudinary.uploader.upload(req.file.path,{resource_type:'video'});
        fs.unlinkSync(req.file.path);
        if(!uploaded)
        {
            return res.status(401).json({
                message:'Can not upload to cloudinary',
                success:false
            })
        }
        const up=await VideoTourmodel.create({
            video:uploaded.secure_url
        })
        if(up)
        {
            return res.status(201).json({
                message:'Uploaded successfuly',
                success:true
            })
        }
        return res.status(401).json({
            message:"can not upload ",
            success:false
        })


    }catch(error)
    {
        return res.status(501).json({
            message:"internal server error",
            success:false
        })

    }
}
export const Gettour=async(req, res)=>{
    try{
        const exist=await VideoTourmodel.findOne();
        if(exist)
        {
            return res.status(201).json(exist)
        }
        return res.status(404).json({
            message:"Can not find "
        })
    }
    catch(error)
    {
        console.log('error',error);
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}