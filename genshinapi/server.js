const express = require('express');
const dataRouter = require('./router/api-router');

const server = express();

server.use(express.json())
server.use('/', dataRouter); 

module.exports = server; 