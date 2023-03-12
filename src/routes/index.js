const router = require('express').Router();

// HELPERS
const prisma = require('../helpers/prisma');
const {
	addUserValidation,
	addBulkUserValidation,
} = require('../helpers/validation');

router.get('/', (req, res) => {
	res.status(200).json({ msg: `API is working fine` });
});

router.post('/add', async (req, res) => {
	const { success, data: value, error } = addUserValidation(req.body);

	if (!success)
		return res.status(400).json({
			msg: error.issues[0].message,
			data: {},
		});

	const user = await prisma.user.create({
		data: value,
	});

	res.status(201).json({
		msg: `User Added`,
		data: user,
	});
});

router.post('/add/bulk', async (req, res) => {
	const { success, data: value, error } = addBulkUserValidation(req.body);

	if (!success)
		return res.status(400).json({
			msg: error.issues[0].message,
			data: {},
		});

	const users = await prisma.user.createMany({
		data: value,
	});

	res.status(201).json({
		msg: `Users Added`,
		data: users,
	});
});

module.exports = router;
