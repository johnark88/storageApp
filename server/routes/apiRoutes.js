module.exports = ((app) => {
  const apiList = require('../controllers/apiBucketController');
  const apiObjectList = require('../controllers/apiObjectsController');
  // Buckets
  app.route('/api/buckets')
    .get(apiList.getAllBuckets)
    .post(apiList.createBucket);
  // .delete()

  // Objects
  app.route('/api/objects/:bucketName')
    .get(apiObjectList.getObjects);
  //   .post(apiList.upLoadObjects)
  //   .get(apiList.downLoadObjects);
  // .delete()
  // app.use((err, req, res, next) => {
  //   // Log error message in our server's console
  //   console.error(err, 'server');
  //   // If err has no specified error code, set error code to 'Internal Server Error (500)'
  //   if (!err.statusCode) {
  //     err.statusCode = 404;
  //   }
  //   // All HTTP requests must have a response, so let's send back an error with its status code and message
  //   res.status(err.statusCode).send(err.message);
  // });
});
