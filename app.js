require('./database/database');

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const apiRouter = require('./api/apiRouter');

const port = 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use('/api', apiRouter);
app.use('/', express.static('public'));

app.listen(process.env.PORT || port);