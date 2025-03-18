
import cloudinary from "../../Config/Cloudinary.js";
import fs from "fs";
import Qualityproduct from "../../Model/Quality/Products.js";
export const QualityProducts=async(req, res)=>{
    try{
        const {name, description ,typeofproduct }=req.body;
        const uploaded=await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path);
        if(!uploaded)
        {
            return res.status(401).json({
                message:'Can not upload on cloudinary',
                success:false
            })
        }

        const created=await Qualityproduct.create({
            name:name,
            description: description,
            typeofproduct:typeofproduct,
            image:uploaded.secure_url

        })
        if(created)
        {
            return res.status(201).json({
                message:'Created successfully',
                created,
                success:true
            })
        }

        return res.status(401).json({
            message:' can not Created ',
           
            success:false
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
export const getallqualityProducts=async(req,res)=>{
    try{
        const getall=await Qualityproduct.find({});
        if(!getall)
        {
            return res.status(401).json({
                message:"Can not get produtcs"
            })

            
        }
        return res.status(201).json(getall);
        

    }catch(error)
    {
        return res.status(501).json({
            message:'Internal server error'
        })
    }
}

export const DeleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Qualityproduct.findById(id);

        // If item not found
        if (!item) {
            return res.status(404).json({
                message: 'Item not found',
                success: false
            });
        }

        // Deleting the item
        const deletedItem = await Qualityproduct.findByIdAndDelete(id);
        
        // If deletion fails
        if (!deletedItem) {
            return res.status(400).json({
                message: 'Failed to delete item',
                success: false
            });
        }

        // Successful deletion
        return res.status(200).json({
            message: 'Deleted successfully',
            success: true,
            deletedItem
        });

    } catch (error) {
        console.error(error); // Always good practice to log error for debugging
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

export const EditQuality = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description , typeofproduct} = req.body;

        // Validate input
        if (!id) {
            return res.status(400).json({
                message: 'No ID provided',
                success: false
            });
        }

        if (!name || !description) {
            return res.status(400).json({
                message: 'Title and Description are required',
                success: false
            });
        }

        // Find the existing record by ID
        const coreAndPrinciple = await Qualityproduct.findById(id);
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
        const updatedCoreAndPrinciple = await Qualityproduct.findByIdAndUpdate(
            id,
            { name, description, typeofproduct, image: updatedImageUrl },
            { new: true }
        );

        // Respond with the updated document
        return res.status(200).json({
            message: 'updated product successfully',
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
