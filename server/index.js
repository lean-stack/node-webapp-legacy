// Check env variables
require('dotenv').config();

// Dependencies
const http = require('http');

const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || "development";

const server = http.createServer();
server.listen(port, () => {
  console.log(`Node.js ${mode} server started. Listening at port ${port}`);
});
