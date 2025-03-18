
import exp from "constants";
import cloudinary from "../../Config/Cloudinary.js";

import Coreandprinciple from "../../Model/Aboutpage/CoreAndPriciple.js";
import fs, { rmSync } from 'fs'
export const CoreAndprinciple=async (req , res)=>{
    try{
        const {title , description}=req.body;
         if(!title || !description || ! req.file.path)
         {
            return res.status(501).json({
                message:'fill all the field'
            })
         }
         const uploaded=await cloudinary.uploader.upload(req.file.path);
         fs.unlinkSync(req.file.path);

         if(!uploaded)
         {
            return res.status(401).json({
                message:'Can not upload'
            })
         }

          const created=await Coreandprinciple.create({
            title:title,
            description:description,
            image:uploaded.secure_url
          })
         if(created)
         {
            return res.status(201).json({
                message:'Created successfully',
                created,
                success:true,

            })
         }
    }catch(error)
    {
        return res.status(501).json({
            message:'internal server error'
        })
    }
}
export const getallcorandprinciple=async(req, res)=>{
    try{
        const getall=await Coreandprinciple.find({});
        if(!getall)
        {
            return res.status(404).json({
                message:'Can not get core and principle'
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

export const EditCoreandprinciple = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description } = req.body;

        // Validate input
        if (!id) {
            return res.status(400).json({
                message: 'No ID provided',
                success: false
            });
        }

        if (!title || !description) {
            return res.status(400).json({
                message: 'Title and Description are required',
                success: false
            });
        }

        // Find the existing record by ID
        const coreAndPrinciple = await Coreandprinciple.findById(id);
        if (!coreAndPrinciple) {
            return res.status(404).json({
                message: 'Cannot find core and principle with this ID',
                success: false
            });
        }

        // Handle image update if new file is uploaded
        let updatedImageUrl ;// Default to the old image if no new file is provided
        if (req.file) {
            // Upload new file to Cloudinary
            const uploaded = await cloudinary.uploader.upload(req.file.path);
            fs.unlinkSync(req.file.path); // Delete the temporary file after upload
            
            if (!uploaded) {
                return res.status(401).json({
                    message: 'Cannot upload the image',
                    success: false
                });
            }

            updatedImageUrl = uploaded.secure_url; // Update with the new image URL
        }

        // Update the document
        const updatedCoreAndPrinciple = await Coreandprinciple.findByIdAndUpdate(
            id,
            { title, description, image: updatedImageUrl },
            { new: true }
        );

        // Respond with the updated document
        return res.status(200).json({
            message: 'Core and principle updated successfully',
            success: true,
            data: updatedCoreAndPrinciple
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Server error',
            success: false
        });
    }
};
