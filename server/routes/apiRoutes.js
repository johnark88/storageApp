module.exports = ((app) => {
  const apiList = require('../controllers/apiBucketController');
  const apiObjectList = require('../controllers/apiObjectsController');
  // Buckets
  app.route('/api/buckets')
    .get(apiList.getAllBuckets)
    .post(apiList.createBucket);
  // .delete()

  app.route('/api/objects/:bucketName')
    // gets folders
    .get(apiObjectList.getObjects);
  //   .post(apiList.upLoadObjects)
  //   .get(apiList.downLoadObjects);
  // .delete()

  app.route('/api/objects/files/:storage/:name')
    .get(apiObjectList.getFileObjects);
});
