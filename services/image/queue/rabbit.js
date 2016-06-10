import amqp from 'amqp';

module.exports = new Promise((resolve, reject) => {
	const rabbit = amqp.createConnection('amqp://guest:guest@localhost:5672');
	rabbit.on('ready', () => resolve(rabbit));
})