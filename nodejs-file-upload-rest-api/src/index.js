const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const logger = require('morgan');
const PORT = process.env.PORT || 8888;
const HOST = process.env.HOST || 'localhost';
const { connectBD } = require("./dbconfig/dbConfig");
const fileRoutes = require('./routes/fileRoutes');

connectBD();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/',fileRoutes);

app.listen(PORT, HOST, () => {
    console.log(`Server are running at http://${HOST}:${PORT}`);
});