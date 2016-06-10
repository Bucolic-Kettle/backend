'use strict';
const secrets = require('./secrets');
const MONGO_ADDR = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT_27017_TCP_PORT || 27017;

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://' + MONGO_ADDR + ':' + MONGO_PORT + '/legacy-development'
  },

  aws: {
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || secrets.aws.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || secrets.aws.AWS_SECRET_KEY,
    S3_BUCKET: process.env.S3_BUCKET || secrets.aws.S3_BUCKET,
    REGION: process.env.REGION || secrets.aws.REGION
  }
  
};
