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
        const imagePath = path.join(process.cwd() + '/uploads/');

        if (!fs.existsSync(imagePath)) {
           fs.mkdirAsync(imagePath)
            .then(() => cb(null, 'uploads/')) 
        } else {
            cb(null, 'uploads/');
        }
    },
    filename: (req, file, cb) => {
        const extension = acceptedMIMETypes[file.mimetype];
        cb(null, file.fieldname + '-' + Date.now() + extension);
    }
});

module.exports = { storage: storage, fileFilter: fileFilter } || {};
