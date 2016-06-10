import aws from 'aws-sdk';
import config from '../config/environment';

exports.upload = (file, imageId) => {
	aws.config.update({accessKeyId: config.aws.AWS_ACCESS_KEY , secretAccessKey: config.aws.AWS_SECRET_KEY });
    aws.config.update({region: config.aws.REGION, signatureVersion: 'v4' });

    const s3 = new aws.S3({
        params: {
            Bucket: config.aws.S3_BUCKET,
            Key: imageId,
            ACL: 'public-read'
        }
    });

    return new Promise((resolve, reject) => {
        s3.upload({Body: file})
            .on('httpUploadProgress', (evt) => (console.log(evt)))
            .send((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
    });
}