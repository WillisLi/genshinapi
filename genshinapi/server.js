const express = require('express');
const favicon = require('serve-favicon')
const path = require('path')
const dataRouter = require('./router/api-router');

const server = express();

server.use(express.json())
server.use(express.static(path.join(__dirname, '../genshinapi/public')))
server.use(favicon(__dirname + '/public/favicon.ico'));
server.use('/', dataRouter); 

module.exports = server; 