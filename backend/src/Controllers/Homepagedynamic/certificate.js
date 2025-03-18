import express from 'express'
import cloudinary from "../../Config/Cloudinary.js";
import fs from 'fs'
import certificatemodel from '../../Model/homepage/Certificate.js';
import exp from 'constants';


export const certificate=async (req,res)=>{
    try{
      const {description, title}=req.body;
      const uploaded=await cloudinary.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path);
      
       
        const created=await certificatemodel.create({
            description:description,
            title:title,
            image:uploaded.secure_url
        })
        if(created)
        {
            return res.status(201).json({
                message:'Certificate is uploaded successfully',
                created,
                success:true,

            })
        }
        return res.status(401).json({
            message:'Can not uploded ',
            success:false
        })


    }
    catch(error)
    {
        console.log('err',error)
        return res.status(501).json({
            message:'Internal server error ',
            success:false
        })
    }
}

export const getallcertificate=async(req, res)=>{
    try{
        const getall=await certificatemodel.find({});
        if(!getall)
        {
            return res.status(404).json({
                message:'Can not get '
            })
        }
        return res.status(201).json(getall);

    }catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}

 // Adjust the path as needed

 export const editCertificate = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description } = req.body;

        console.log('Request Body:', req.body);
        console.log('Request File:', req.file);

        // Find the certificate by ID
        const existing = await certificatemodel.findById(id);
        if (!existing) {
            return res.status(404).json({
                message: 'Cannot find certificate with this ID',
                success: false,
            });
        }
        console.log('Existing Certificate:', existing);

        // Handle image upload if a new file is provided
        let image = existing.image; // Default to the existing image
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path);
            image = uploadResult.secure_url; // Use secure_url for Cloudinary
            fs.unlinkSync(req.file.path); // Delete the file from the server
        }

        // Update the certificate
        const updatedCertificate = await certificatemodel.findByIdAndUpdate(
            id,
            { title, description, image },
            { new: true } // Return the updated document
        );
        console.log('Updated Certificate:', updatedCertificate);

        return res.status(200).json({
            message: 'Certificate updated successfully',
            updatedCertificate,
            success: true,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
};

export const deleteCertificate=async(req,res)=>{
    try{
        const id=req.params.id;
        console.log('id',id);
        const certificate=await certificatemodel.findById(id);
        if(!certificate)
        {
            return res.status(404).json({
                message:'Can not found certificate',
                success:false
            })
        }
        const deleted=await certificatemodel.findByIdAndDelete(id);
        if(deleted)
        {
            return res.status(201).json({
                message:'Certificate deleted successully',
                success:true
            })
        }
    }
    catch(error)
    {
        console.log('error',error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
}
