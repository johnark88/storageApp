const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

// console.log(process.env.NODE_ENV);
// console.log(NODE_ENV);
// const fireDb = require('./api/models/todoListModel'), //created model loading here

require('dotenv').config();
const serviceAccount = require('./service.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://photostorage-224716.firebaseio.com',
});

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// importing routes
const routes = require('./routes/apiRoutes');
const userRoutes = require('./routes/user');

// register the routes
routes(app);
userRoutes(app);

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
