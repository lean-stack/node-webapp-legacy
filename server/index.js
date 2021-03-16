// Check env variables
require('dotenv').config();

// Dependencies
const http = require('http');
const { app } = require('./app');

const port = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || "development";

if (mode === 'development') {

  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');

  const config = require('../webpack.config.js');
  const compiler = webpack(config);

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  );

}



const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Node.js ${mode} server started. Listening at port ${port}`);
});
