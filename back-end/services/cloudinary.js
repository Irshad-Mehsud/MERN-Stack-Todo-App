import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs-extra";

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Upload File Function
const uploadFile = async (filePath) => {
  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "uploads", // optional folder
    });

    console.log("Uploaded to Cloudinary:", result.secure_url);

    // Delete local file after successful upload
    await fs.remove(filePath);
    console.log("Local file deleted:", filePath);

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);

    // If upload fails, still delete local file to avoid storage issues
    if (await fs.pathExists(filePath)) {
      await fs.remove(filePath);
      console.log("Local file deleted after failure:", filePath);
    }

    throw error;
  }
};

export default uploadFile;
