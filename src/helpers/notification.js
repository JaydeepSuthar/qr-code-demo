const admin = require('firebase-admin');
const { getMessaging } = require('firebase-admin/messaging');

// * INIT

// const firebaseConfig = {
// 	apiKey: 'AIzaSyAgTXnZ1ZBm96-3a4TQvoGHGMYY7n1KsgM',
// 	authDomain: 'progress-alliance-app.firebaseapp.com',
// 	projectId: 'progress-alliance-app',
// 	storageBucket: 'progress-alliance-app.appspot.com',
// 	messagingSenderId: '839833887479',
// 	appId: '1:839833887479:web:fd20dc6f0ad944263a29f2',
// 	measurementId: 'G-7BJBY83RLZ',
// };

let isInitialized = false;

const serviceAccount = require('../../cred/progress-alliance-app-firebase-adminsdk-4tk2n-4215bd5775.json');

// initializeApp({
// 	credential: cert(serviceAccount),
// });

if (!isInitialized) {
	const cert = admin.credential.cert(serviceAccount);

	admin.initializeApp({
		credential: cert,
	});

	isInitialized = true;
}

const fcm = getMessaging();

/**
 *
 * @param {{title: string, body: string}} payload
 * @returns {void}
 * @throws Payload is Not Valida
 */
const validatePayload = (payload) => {
	const error = new Error();
	if (payload.title && payload.body) return true;

	error.message = `Notification Payload Must Have Title and Body`;
	error.statusCode = 400;

	throw error;
};

/**
 *
 * @param {string} topic
 * @param {{title: string, body: string}} payload
 * @returns {Promise<MessagingTopicResponse>}
 */
module.exports.sendToTopic = (topic = 'all', payload) => {
	validatePayload(payload);

	return fcm.sendToTopic(topic, { notification: payload });
};

/**
 *
 * @param {string} token
 * @param {{title: string, body: string}} payload
 * @returns {Promise<MessagingDevicesResponse>}
 */
module.exports.sendToSingleDevice = (token, payload) => {
	validatePayload(payload);

	return fcm.sendToDevice(token, { notification: payload });
};

/**
 *
 * @param {Array<string>} tokens
 * @param {{title: string, body: string}} payload
 * @returns {Promise<MessagingDevicesResponse>}
 */
module.exports.sendToMultipleDevices = (tokens, payload) => {
	validatePayload(payload);

	return fcm.sendToDevice(tokens, { notification: payload });
};
