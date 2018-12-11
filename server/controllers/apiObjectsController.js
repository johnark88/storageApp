const { Storage } = require('@google-cloud/storage');

const projectId = 'photostorage-224716';

const storage = new Storage ({
  projectId: projectId,
  keyFilename: './storage.json',
});

exports.getObjects = async (req, res) => {
  const bucketName = req.params.bucketName;
  const [files] = await storage.bucket(bucketName).getFiles();
  const bucketObjects = {
    bucket: bucketName,
    files: [],
  };
  files.forEach((file) => {
    console.log(file.name);
    bucketObjects.files.push(file.name);
  });
  res.json(bucketObjects);
};
