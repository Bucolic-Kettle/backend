import express from 'express';
import mongoose from 'mongoose';
import config from './config/environment';


require('./config/db')(config);

const app = express();
const server = require('http').createServer(app);

require('./config/express')(app);

app.use('/api/v1', require('./api'));

server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;