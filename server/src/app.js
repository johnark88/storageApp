const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

let app = express();
app.use(cors());
app.use(bodyParser.json());

