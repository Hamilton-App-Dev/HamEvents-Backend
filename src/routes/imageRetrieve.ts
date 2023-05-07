import { Request, Response } from "express";
import AWS from "aws-sdk";

export default imageRetrieve;

async function imageRetrieve(req: Request, res: Response) {
    const imageId = String(req.params.id);

    const myBucket = "appdev-events-images";
    const myKey = imageId;
    const signedUrlExpireSeconds = 60 * 1;

    const s3 = new AWS.S3({
        accessKeyId: "AKIAWIIUQUUCJKG3YIU3",
        signatureVersion: "v4",
        region: "us-east-1",
        secretAccessKey: "JqriGfRjZtl1KRLu6z6V+I7eMcVHFKn7iQgNOvnX",
    });

    const url = s3.getSignedUrl("getObject", {
        Bucket: myBucket,
        Key: myKey,
        Expires: signedUrlExpireSeconds,
    });

    console.log(url);
    return url;
}

//exports.getObjects = function (req, res) {
//var item = req.body;
//var params = { Bucket: req.params.bucketName, Key: "keyname" }; // keyname can be a filename
//s3.getObject(params, function (err, data) {
//if (err) {
//return res.send({ error: err });
//}
//res.send({ data });
//});
//};
