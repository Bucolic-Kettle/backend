const rabbitPromise = require('./rabbit');

const queueSetup = (rabbit) => {
	rabbit.queue('image-queue', {autoDelete: false}, (q) => {
		q.bind('image-exchange', '#');
		q.close();
	})
}

module.exports = new Promise((resolve, reject) => {
	rabbitPromise.then((rabbit) => {
		rabbit.exchange('image-exchange', { type: 'fanout' }, (exchange) => {
			queueSetup(rabbit);
			resolve(exchange);
		});
	})
})