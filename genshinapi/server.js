const express = require('express');
const path = require('path')
const dataRouter = require('./router/api-router');

const server = express();

server.use(express.json())
server.use(express.static(path.join(__dirname, '../genshinapi/public')))
server.use('/', dataRouter);

module.exports = server; 