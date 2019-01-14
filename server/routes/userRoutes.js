module.exports = ((app) => {
  const usersController = require('../controllers/usersController');
  app.route('/users/:id')
    .get(usersController.getUser);
});
