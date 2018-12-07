const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const fireDb = require('./api/models/todoListModel'), //created model loading here
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./routes/apiRoutes'); // importing route

routes(app); // register the route

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
