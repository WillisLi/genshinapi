const express = require('express');
const server = express();
const path = require('path')
const dataRouter = require('./router/api-router');

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public', 'assets')))
server.use('/', dataRouter);

module.exports = server; 