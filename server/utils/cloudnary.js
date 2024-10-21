import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const uploadOnCloud = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      return reject(new Error("No file buffer provided"));
    }
    // Create a stream for uploading
    const stream = cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return reject(new Error(error));
        }
        resolve(result); // Resolve the promise with the result
      })
      .end(fileBuffer);

    // Write the buffer to the stream
    stream.end(fileBuffer); // End the stream with the file buffer
  });
};

export { uploadOnCloud };
