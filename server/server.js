const express = require('express');
const bodyParser = require('body-parser');
const api = require('./router/api');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

app.listen(3000, () => console.log('Server running on port: 3000'))
