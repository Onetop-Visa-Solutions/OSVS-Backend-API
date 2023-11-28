const Minio = require('minio');

const minioCLient = new Minio.Client({
  endPoint: 'onesteps.storage.io',
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_KEY,
  secretKey: process.env.MINIO_SECRET,
});
const bucketName = process.env.BUCKET_NAME;

const fileUpload = async (fileName, file) => {
  if (!file) {
    return { message: 'No file uploaded' };
  }
  await minioCLient.putObject(bucketName, fileName, file, function (err, etag) {
    if (err) {
      console.log('Error uploading file:', err);
    } else {
      console.log('File uploaded successfully. Etag:', etag);
      const fileUrl =
        minioCLient.protocol +
        '//' +
        minioCLient.host +
        ':' +
        minioCLient.port +
        '/' +
        bucketName +
        '/' +
        fileName;
      return fileUrl;
    }
  });
};

module.exports = fileUpload;
