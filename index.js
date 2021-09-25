require("dotenv").config();

const server = require('./genshinapi/server')

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});