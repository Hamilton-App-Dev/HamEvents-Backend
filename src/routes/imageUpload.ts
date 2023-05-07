import { Request, Response, NextFunction } from "express";
import AWS from "aws-sdk";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const s3Config = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: "AKIAWIIUQUUCJKG3YIU3",
        secretAccessKey: "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",
    },
});

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3Config,
        bucket: "appdev-events-images",
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (req: any, file: any, cb: any) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req: any, file: any, cb: any) => {
            const fileName = Date.now() + "-" + file.originalname;
            cb(null, fileName);
        },
    }),
    fileFilter: (req: any, file: any, cb: any) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

const imageUploadMiddleware = upload.single("image");

async function imageUpload(req: any, res: Response) {
    try {
        if (!req.file) {
            res.status(400).json({ error: "No image file uploaded." });
            return;
        }

        res.status(200).json({
            message: "Image uploaded successfully.",
            imageUrl: "test",
        });
    } catch (error) {
        res.status(500).json({ error: "L" });
    }
}

export { imageUploadMiddleware, imageUpload };
