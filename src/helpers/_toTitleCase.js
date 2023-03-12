module.exports.toTitleCase = (str) => {
	if (typeof str == 'string')
		return str.charAt(0).toUpperCase() + str.slice(1);
	else throw new Error(`Str Must be a String`);
};
