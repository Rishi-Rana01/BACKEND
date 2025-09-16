import { v2 as cloudinary } from 'cloudinary';
import e from 'express';
import fs from 'fs';

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY,  
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

const uploadOnCloudinary = async(localFilePath)=>{
    try{
        if(!localFilePath){
            throw new Error("File path is required")
        }
        const result = await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
        console.log("File uploaded to Cloudinary successfully", result.url);
        return result;
    }catch(error){
        fs.unlinkSync(localFilePath)
        console.error("Error uploading file to Cloudinary", error);
        throw error;
    }
}

export {uploadOnCloudinary};