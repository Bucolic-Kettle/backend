import mongoose from 'mongoose';

module.exports = (config) => {

  const db = mongoose.connect(config.mongo.uri, config.mongo.options, (err) => {
    if (err) {
      console.error('Could not connect to MongoDB!');
      console.log(err);
    }
  });

  mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  });

  return db;
};
