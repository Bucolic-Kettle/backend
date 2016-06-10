const express = require('express');
const path = require('path');
const multer = require('multer');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const acceptedMIMETypes = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif"
};

const fileFilter = (req, file, cb) => {
    cb(null, Object.keys(acceptedMIMETypes).indexOf(file.mimetype) !== -1);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirAsync(path.join(__dirname + 'uploads/'))
          .then(() => cb(null, 'uploads/'))
    },
    filename: (req, file, cb) => {
        const extension = acceptedMIMETypes[file.mimetype];
        const id = 1;
        req.body.id = id;
        cb(null, id + extension);
    }
});

module.exports = { storage: storage, fileFilter: fileFilter } || {};
