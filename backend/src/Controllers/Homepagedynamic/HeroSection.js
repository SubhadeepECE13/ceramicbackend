import exp from "constants";
import cloudinary from "../../Config/Cloudinary.js";
import heromodel from "../../Model/homepage/Hero.js";
import fs from "fs";

export const HeroSection = async (req, res) => {
    try {
        const { content1, content2 } = req.body;

        if (!req.file) {
            return res.status(400).json({
                message: "Video file is required",
                success: false,
            });
        }

        const video = req.file;

        // Ensure correct file path format for Cloudinary
        const filePath = video.path.replace(/\\/g, "/");

        // Upload the video to Cloudinary
        const uploadvideo = await cloudinary.uploader.upload(filePath, {
            resource_type: "video", // Explicitly specify video
        });

        // Clean up local file
        fs.unlinkSync(filePath);

        const videourl = uploadvideo.secure_url;

        // Check if a record already exists
        const existing = await heromodel.findOne();

        if (existing) {
            // Update the existing record
            const updated = await heromodel.findByIdAndUpdate(
                existing._id,
                { content1, content2, video: videourl },
                { new: true } // Return the updated document
            );

            if (updated) {
                return res.status(200).json({
                    message: "Updated successfully",
                    success: true,
                    updated,
                });
            }

            return res.status(500).json({
                message: "Could not update the record",
                success: false,
            });
        }

        // Create a new record if none exists
        const created = await heromodel.create({
            video: videourl,
            content1,
            content2,
        });

        if (created) {
            return res.status(201).json({
                message: "Uploaded successfully",
                success: true,
                created,
            });
        }

        return res.status(500).json({
            message: "Could not create the record",
            success: false,
        });
    } catch (error) {
        console.error("Error in HeroSection:", error);

        if (error.http_code === 400) {
            return res.status(400).json({
                message: "Invalid file. Please upload a valid video file.",
                success: false,
            });
        }

        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

export const GetHerosection=async(req,res)=>{
    try{
        const gethero=await heromodel.findOne();

        if(!gethero)
        {
            return res.status(404).json({
                message:'Can not get '
            })
        }

        return res.status(201).json({
            gethero,
            success:true
        })

    }
    catch(error)
    {
     return res.status(501).json({
        message:'Internal server error',
        success:false
     })
    }
}



export const EditHeroSectionofvideo = async (req, res) => {
    try {
        const { content1, content2 } = req.body; // Updated content from the request body
        console.log("Request Body:", req.body);

        // Find the existing record
        const existing = await heromodel.findOne();
        if (!existing) {
            return res.status(404).json({
                message: "Hero section not found",
                success: false,
            });
        }

        let videoUrl = existing.video; // Default to the existing video URL

        // Check if a new video file is provided
        if (req.file) {
            const filePath = req.file.path.replace(/\\/g, "/");

            // Upload the new video to Cloudinary
            const uploadvideo = await cloudinary.uploader.upload(filePath, {
                resource_type: "video", // Explicitly specify video
            });

            // Clean up the local file
            fs.unlinkSync(filePath);

            // Update the video URL with the new uploaded video
            videoUrl = uploadvideo.secure_url;
        }

        // Update the existing record with the new content and video URL
        const updated = await heromodel.findByIdAndUpdate(
            existing._id,
            { content1, content2, video: videoUrl },
            { new: true } // Return the updated document
        );

        if (updated) {
            return res.status(200).json({
                message: "Hero section updated successfully",
                success: true,
                updated,
            });
        }

        return res.status(500).json({
            message: "Failed to update the hero section",
            success: false,
        });
    } catch (error) {
        console.error("Error in EditHeroSection:", error);

        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
