const cloudinary = require("cloudinary").v2;
const { cloudinaryConfig } = require("../config/cloudnaryConfig.js");
const fs = require("fs");

cloudinaryConfig();

exports.uploadImageToCloudinary = async (filePath, folder) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "image",
    });

    // Delete local file after upload
    fs.unlinkSync(filePath);

    return uploadResponse;
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    throw new Error("Error uploading image to Cloudinary");
  }
};
