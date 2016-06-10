'use strict';

// Test specific configuration
// ===========================
const MONGO_ADDR = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT_27017_TCP_PORT || 27017;

module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://' + MONGO_ADDR + ':' + MONGO_PORT + '/legacy-test'
  }
};
