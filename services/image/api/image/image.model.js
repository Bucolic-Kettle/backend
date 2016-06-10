const mongoose = require('bluebird').promisifyAll(require('mongoose'));

const imageSchema = mongoose.Schema({
    path: String
});

module.exports = mongoose.model('Image', imageSchema);