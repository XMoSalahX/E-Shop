import multer from "multer";
import { Error } from "../utlities/error_response";

const error = new Error();
const { API } = process.env;

// Multer Configrations
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `upload/`);
  },
  filename: function (req, file, cb) {
    const newName = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, newName);
    req.body.imageName = `${API}/${newName}`;
  },
});

const upload = multer({
  storage: storage,
  // File fillter
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      req.body.errorMulter = error.error_400;
    }
  },
}).single("image");

export default upload;
