const { Storage } = require('@google-cloud/storage');

const projectId = 'photostorage-224716';

const storage = new Storage ({
  projectId: projectId,
  keyFilename: './storage.json',
});


exports.getAllBuckets = async (req, res) => {
  const allBuckets = [];
  const [buckets] = await storage.getBuckets();
  let i = 0;
  buckets.forEach((bucket) => {
    allBuckets.push({ value: i, name: bucket.name });
    i++;
  });
  res.json(allBuckets);
};

exports.createBucket = async (req, res, next) => {
  console.log(req.body);
  const bucketName = req.body.name;
  console.log(bucketName);
  await storage.createBucket(bucketName, {
    location: 'US-central1',
    storageClass: 'Regional',
  }).then((response) => {
    console.log(response.message, 'response');
    res.send(200, `Bucket ${bucketName} created`);
  }).catch((error) => {
    let err = {};
    err.message = error.message;
    err.statusCode = 404;
    next({ err });
    // res.send(err);
  });
};
