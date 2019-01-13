
module.exports = ((app) => {
  const users = require('../controllers/usersController');

  app.route('/users')
    .get(users.getUsers);
  // .post(apiList.createBucket);
  // .put()
  // .delete()
});
