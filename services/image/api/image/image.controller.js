import Promise from 'bluebird';
import fs from 'fs';
import * as awsService from '../../lib/aws';
import Image from './image.model';

Promise.promisifyAll(fs);

const createImage = (path) => {
	const image = new Image({
		path: path
	});

	return image.saveAsync(); // returns a Promise
}

exports.create = (req, res) => {
	const file = fs.createReadStream(req.file.path);

	awsService.upload(file, req.file.filename)
		.then((data) => {
			return createImage(data.Location);
		})
		.then((image) => {
			fs.unlink(req.file.path, () => {
				res.status(201).send(JSON.stringify({
		          id: image.id,
		          path: image.path,
		        }));
			});
		});
}