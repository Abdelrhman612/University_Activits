import multer from "multer";
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const filename = `User-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

export const fileFilter: any = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};
