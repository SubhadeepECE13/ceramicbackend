import exp from "constants";
import cloudinary from "../../Config/Cloudinary.js"
import Product from "../../Model/homepage/products.js";
import fs from 'fs'



export const AddProduct=async(req,res)=>{
    try{
        const {title, description,category}=req.body;
        console.log("whi",req.body)
         const uploaded=await cloudinary.uploader.upload(req.file.path);
         console.log(uploaded);
         const created=await Product.create({
            title:title,
            description:description,
            image: uploaded.secure_url,
            typeofproduct:category
         });
         
         fs.unlinkSync(req.file.path);

         if(created)
         {
            return res.status(201).json({
                message:'Product is created',
                success:true,
                created
            })
         }
         return res.status(401).json({
            message:'Cloud not create',
            success:false
         })



    }
    catch(error)
    {
        return res.status(501).json({
            message:'internal server error',
            success:true
        })

    }
}
export const Getallproucts=async(req,res)=>{
    try{

        const getall=await Product.find({});
        if(!getall)
        {
            return res.status(404).json({
                message:'Can not get products'
            })
        }
        return res.status(201).json({
            message:'Successfully created ',
            getall,
            success:true
        })
    }
    catch(error)
    {
        return res.status(501).json({
            message:'internal sever error',
            success:false
        })

    }
}
// Assuming the model is correctly imported

export const EditProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const { description, title, category } = req.body;

        console.log("Editing Product ID:", id);
        console.log("Request Body:", req.body);
        console.log("File Information:", req.file);

        // Find the product by ID
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: 'Cannot find product with this ID',
                success: false
            });
        }

        // Handle image upload if a new file is provided
        let uploadedImage = product.image; // Retain the existing image
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path);
            console.log("Cloudinary Upload Result:", uploadResult);

            // Ensure file path exists before deleting
            try {
                fs.unlinkSync(req.file.path); // Blocking file deletion
            } catch (error) {
                console.error("Error deleting file:", error);
            }

            uploadedImage = uploadResult.secure_url; // Get the new image URL
        }

        console.log("Updating Product Data:", { description, title, image: uploadedImage });

        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { description, title, image: uploadedImage,typeofproduct:category },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Failed to update product',
                success: false
            });
        }

        console.log("Updated Product:", updatedProduct);

        return res.status(200).json({
            message: 'Product updated successfully',
            success: true,
            product: updatedProduct
        });
    } catch (error) {
        console.error('Error updating product:', error); // Log the error
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};


export const deleteproduct=async(req,res)=>{
    try{
        const id=req.params.id;
        console.log('id',id);
        const certificate=await Product.findById(id);
        if(!certificate)
        {
            return res.status(404).json({
                message:'Can not found certificate',
                success:false
            })
        }
        const deleted=await Product.findByIdAndDelete(id);
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
