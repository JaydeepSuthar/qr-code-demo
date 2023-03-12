const { z } = require('zod');

module.exports.addUserValidation = (data) => {
	const userSchema = z.object({
		name: z.string().trim(),
		mobile_number: z.string().max(10),
	});

	return userSchema.safeParse(data);
};

module.exports.addBulkUserValidation = (data) => {
	const userSchema = z.array(
		z.object({
			name: z
				.string({
					invalid_type_error: 'Invalid name',
					required_error: 'Name is required',
				})
				.trim(),
			mobile_number: z
				.string({
					invalid_type_error: 'Invalid mobile number',
					required_error: 'Mobile Number is required',
				})
				.min(10, {
					message: `Mobile Number Must be 10 Digit`,
				})
				.max(10, {
					message: `Mobile Number Must be 10 Digit`,
				}),
		})
	);

	return userSchema.safeParse(data);
};
