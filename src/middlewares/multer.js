import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "kppFileUpload",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
    transformation: [{ width: 800, height: 600, crop: "limit" }],
    public_id: (req, file) => {
      return `img-${Date.now()}`;
    },
  },
});

export const upload = multer({ storage });

export const deleteFileFromCloudinary = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      { invalidate: true, resource_type: "image" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary delete error:", error);
          reject(error);
        } else {
          console.log("Cloudinary delete result:", result);
          resolve(result);
        }
      }
    );
  });
};
