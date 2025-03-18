import aboutusinhomepage from "../../Model/homepage/About.js";
import cloudinary from "../../Config/Cloudinary.js";
import fs from "fs";

export const Aboutinhome = async (req, res) => {
  try {
    const { header, content } = req.body;
    console.log("header", header);

    // Check if a document already exists
    const existingDocument = await aboutusinhomepage.findOne();

    // Initialize variable for the image URL
    let imageUrl = existingDocument ? existingDocument.image : null;

    // If a new image is uploaded, upload it to Cloudinary
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path); // Delete the local file after uploading
      imageUrl = uploaded.secure_url; // Use the newly uploaded image URL
    }

    // If the document exists, update it
    if (existingDocument) {
      const updated = await aboutusinhomepage.findByIdAndUpdate(
        existingDocument._id,
        { header, content, image: imageUrl }, // Update with new or existing image
        { new: true } // Return the updated document
      );

      if (updated) {
        return res.status(200).json({
          message: "Updated successfully",
          document: updated,
        });
      }

      return res.status(400).json({
        message: "Could not update the document",
        success: false,
      });
    }

    // If no document exists, create a new one with or without an image
    const created = await aboutusinhomepage.create({
      header,
      content,
      image: imageUrl, // Use the image URL (new or existing)
    });

    if (created) {
      return res.status(201).json({
        message: "Uploaded successfully",
        document: created,
      });
    }

    return res.status(400).json({
      message: "Could not create the document",
      success: false,
    });
  } catch (error) {
    console.error("Error in Aboutinhome:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


export const GetAboutUs=async(req,res)=>{
  try{
    const getaboutus=await aboutusinhomepage.findOne();
     if(!getaboutus)
     {
      return res.status(404).json({
        message:'Can not get about us',
        success:false
      })
     }
     return res.status(201).json(getaboutus);
  }catch(error)
  {
    return res.status(501).json({
      message:'Internal server error',
      success:false
    })
  }
}



// Edit Hero Section (for updating content and file)
export const EditHeroSection = async (req, res) => {
  try {
    const { content1, content2 } = req.body;  // Assuming content is sent in the body
    console.log("Content1:", content1);
    console.log("Content2:", content2);

    // Find existing document
    const existingHero = await aboutusinhomepage.findOne();

    // Initialize variables for image/video URL
    let mediaUrl = existingHero ? existingHero.media : null;

    // Check if a new file (image or video) is uploaded
    if (req.file) {
      // Handle video or image uploads
      const uploadedMedia = await cloudinary.uploader.upload(req.file.path, {
        resource_type: req.file.mimetype.startsWith('image') ? "image" : "video", // Dynamically choose resource type
      });
      
      // Delete the local file after uploading
      fs.unlinkSync(req.file.path);
      mediaUrl = uploadedMedia.secure_url;  // Use the uploaded file URL
    }

    // If a record exists, update it
    if (existingHero) {
      const updatedHero = await aboutusinhomepage.findByIdAndUpdate(
        existingHero._id,
        {
          content1,
          content2,
          media: mediaUrl,  // Update the media URL
        },
        { new: true }  // Return the updated document
      );

      if (updatedHero) {
        return res.status(200).json({
          message: "Hero section updated successfully",
          document: updatedHero,
        });
      }

      return res.status(400).json({
        message: "Failed to update hero section",
        success: false,
      });
    }

    // If no existing document, create a new hero section
    const newHero = await aboutusinhomepage.create({
      content1,
      content2,
      media: mediaUrl,  // Add media (image/video) URL
    });

    if (newHero) {
      return res.status(201).json({
        message: "Hero section created successfully",
        document: newHero,
      });
    }

    return res.status(400).json({
      message: "Failed to create hero section",
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
