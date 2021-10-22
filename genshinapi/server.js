const express = require('express');
const dataRouter = require('./router/api-router');
const cors = require('cors');
const helmet = require('helmet');
const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use('/', dataRouter); 

module.exports = server; 