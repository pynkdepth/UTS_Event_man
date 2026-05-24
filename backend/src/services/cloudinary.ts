import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:    process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadBuffer = (
  buffer: Buffer,
  folder = "invofest"
): Promise<any> =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(buffer);
  });

export const uploadToCloudinary = (
  filePath: string,
  folder = "invofest"
) => cloudinary.uploader.upload(filePath, { folder, resource_type: "auto" });