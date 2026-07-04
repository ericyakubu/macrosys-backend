import { v2 as Cloudinary } from 'cloudinary';

// import { CloudinaryService } from './cloudinary.service';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return Cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
  // inject: [CloudinaryService],
};
