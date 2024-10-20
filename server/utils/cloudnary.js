import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret 
});

const uploadOnCloud = async (fileBuffer) => {
    try {
        if (!fileBuffer) {
            return null;
        }

        const response = await cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
                if (error) {
                    throw new Error(error);
                }
                return result;
            }
        );

        const stream = cloudinary.uploader.upload_stream(response);
        stream.end(fileBuffer); // End the stream with the file buffer

        return response; // Return the Cloudinary response
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
};

export { uploadOnCloud };
