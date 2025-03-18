import cloudinary from "../../Config/Cloudinary.js";
import management from "../../Model/homepage/ManagementTeamModel.js";
import fs, { rmSync } from 'fs'
export const Management=async(req, res)=>{
    try{
        const {position, name, description}=req.body;
        console.log()
         const uploaded=await cloudinary.uploader.upload(req.file.path);
         if(!position || !name)
         {
            return req.status(401).json({
                message:'Please fill all the field ',
                success:false
            })
         }
         fs.unlinkSync(req.file.path);

         const created= await management.create({
            position:position,
            name:name,
            description:description,
            image: uploaded.secure_url

         })

         if(created)
         {
            return res.status(201).json({
                message:'Created successfully',
                created,
                success:true
            })
         }
         return res.status(501).json({
            message:'can not create ',
            success:false
         })



    }catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:false
        })
    }
}
export const updateManagement = async (req, res) => {
    try {
        const { id } = req.params;
        const { position, name, description } = req.body;

        // Find the existing management member
        const member = await management.findById(id);
        if (!member) {
            return res.status(404).json({
                message: "Management member not found",
                success: false,
            });
        }

        let updatedImage = member.image; // Keep old image by default

        // If a new image is uploaded, delete the old one from Cloudinary and update with the new one
        if (req.file) {
            // Extract Cloudinary public_id from the existing image URL
            const imagePublicId = member.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imagePublicId);

            // Upload new image
            const uploaded = await cloudinary.uploader.upload(req.file.path);
            updatedImage = uploaded.secure_url;
        }

        // Update management details in the database
        const updatedMember = await management.findByIdAndUpdate(
            id,
            {
                position: position || member.position,
                name: name || member.name,
                description: description || member.description,
                image: updatedImage,
            },
            { new: true }
        );

        return res.status(200).json({
            message: "Updated successfully",
            updatedMember,
            success: true,
        });

    } catch (error) {
        console.error("Error updating management:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
export const Getallmanagement=async(req, res)=>{
    try{
        const getallmanagement=await management.find({});
        if(!getallmanagement)
        {
            return res.status(404).json({
                message:'Can not found',
                success:true
            })
        }
        return res.status(201).json(getallmanagement);
        

    }catch(error)
    {
        return res.status(501).json({
            message:'Internal server error',
            success:true
        })
    }
}
export const deleteManagement = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the management member by ID
        const member = await management.findById(id);
        if (!member) {
            return res.status(404).json({
                message: "Management member not found",
                success: false,
            });
        }

        // Delete image from Cloudinary
        const imagePublicId = member.image.split("/").pop().split(".")[0]; // Extract public_id from URL
        await cloudinary.uploader.destroy(imagePublicId);

        // Delete from database
        await management.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Deleted successfully",
            success: true,
        });

    } catch (error) {
        console.error("Error deleting management:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};