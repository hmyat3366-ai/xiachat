const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file provided' });
    }

    let stream = cloudinary.uploader.upload_stream(
      { folder: 'xiachat', resource_type: 'auto' },
      (error, result) => {
        if (result) {
          res.json({ success: true, url: result.secure_url });
        } else {
          res.status(500).json({ success: false, error: 'Upload to Cloudinary failed' });
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
