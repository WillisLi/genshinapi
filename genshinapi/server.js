const express = require('express');
const dataRouter = require('./router/api-router');
const cors = require('cors')
const server = express();

server.use(express.json())
server.use(cors())
server.use('/', dataRouter); 

module.exports = server; 