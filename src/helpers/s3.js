const aws = require('aws-sdk');

const crypto = require('crypto');
const { promisify } = require('util');

const randomBytes = promisify(crypto.randomBytes);

const region = 'us-west-2';
const bucketName = process.env.AWS_S3_BUCKETNAME;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_ACCESS_KEY;

const s3 = new aws.S3({
	region,
	accessKeyId,
	secretAccessKey,
	signatureVersion: 'v4',
});

module.exports.generateS3UploadUrl = async () => {
	const rawBytes = await randomBytes(8);
	const objectName = rawBytes.toString('hex');

	const params = {
		Bucket: bucketName,
		Key: objectName,
		Expires: 60 * 5,
	};

	const url = await s3.getSignedUrlPromise('putObject', params);
	return url;
};

module.exports.generateS3UploadUrlWithFileName = async (fileName) => {
	const objectName = fileName;

	const params = {
		Bucket: bucketName,
		Key: objectName,
		Expires: 60 * 5,
	};

	const url = await s3.getSignedUrlPromise('putObject', params);
	return url;
};

module.exports.removeFile = async (fileUrl) => {
	const objectName = fileUrl;

	const params = {
		Bucket: bucketName,
		Key: objectName,
	};

	const response = await s3.deleteObject(params).promise();
	return response;
};

module.exports.downloadFileOld = async (fileUrl, res) => {
	const objectName = fileUrl;

	const params = {
		Bucket: bucketName,
		Key: objectName,
	};

	// const response = await s3.getObject(params).promise();
	res.attachment(objectName);
	// const response = await s3.getObject(params).promise();
	const fileStream = s3.getObject(params).createReadStream();
	fileStream.pipe(res);

	// return response;
};

module.exports.downloadFile = async (fileUrl) => {
	const objectName = fileUrl;

	const params = {
		Bucket: bucketName,
		Key: objectName,
	};

	return await s3.getObject(params).promise();
};
