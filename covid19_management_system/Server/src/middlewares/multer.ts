import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "public", "uploads"));
    },
    filename: function (req, file, cb) {
        const extension = file.originalname.split(".").pop();
        cb(null, req.body.id + "." + extension);
    },
});

export const upload = multer({ storage });
