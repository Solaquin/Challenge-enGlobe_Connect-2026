import multer from "multer";
import path from "path";
import fs from "fs-extra";

const storage = multer.diskStorage({

    destination: async (req, file, cb) => {

        try {

            const launchId = req.params.id;

            const folder = path.join(
                "uploads",
                "launches",
                launchId
            );

            await fs.ensureDir(folder);

            cb(null, folder);

        } catch (error) {

            cb(error);

        }

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

const fileFilter = (req, file, cb) => {

    const allowedMimeTypes = [

        "image/png",
        "image/jpeg",
        "image/webp",

        "video/mp4",

        "application/pdf",

        "application/msword",

        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

    ];

    if (allowedMimeTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(new Error("Unsupported file type"));

    }

};

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 20 * 1024 * 1024

    }

});

export default upload;