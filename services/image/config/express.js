import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';

module.exports = (app) => {
	const env = app.get('env')

	app.use(cors());
	app.use(compression());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(methodOverride());
	app.use(cookieParser());

	if ('development' === env || env === 'test') {
		app.use(morgan('dev'));
		app.use(errorHandler());
	}
}