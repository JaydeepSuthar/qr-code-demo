require('dotenv').config({ path: `${__dirname}/../.env` });

const express = require('express');
const cors = require('cors');
const logger = require('morgan');

// * INIT
const app = express();
const port = process.env.PORT || 1337;

// * MIDDLEWARE
app.use(
	cors({
		origin: '*',
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger(`dev`));

// * IMPORTED ROUTES
app.use('/api', require('./routes'));

// * ROUTES
app.get('/', async (req, res) => {
	res.status(200).json({ msg: `Backend is Working` });
});

app.use('*', function (req, res) {
	res.status(404).json({ msg: 'API Not Found', data: {} });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message =
		err.message || `Internal server error || Global error handler`;

	console.error(err);

	res.status(err.statusCode).json({
		msg: err.message,
		error: err.message,
		data: {},
	});
});

// * SERVER
const server = app.listen(
	port,
	console.log(
		`\nProcess ID: ${process.pid}\nlistening at http://localhost:${port}\nDB: ${process.env.DATABASE_URL}`
	)
);

// * FOR GRACEFUL SHUTDOWN OF SERVER
process.on(`SIGINT`, () => {
	console.log(`SIGINT received. Shutting down gracefully`);
	server.close(() => {
		console.log('Server closed gracefully...');
		process.exit(0);
	});
});

process.on(`SIGTERM`, () => {
	console.log(`SIGTERM received. Shutting down gracefully`);
	server.close(() => {
		console.log('Server closed gracefully...');
		process.exit(0);
	});
});
