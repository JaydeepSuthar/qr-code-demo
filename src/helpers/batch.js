/**
 *
 * @param {Array<any>} large_arr
 * @param {number} [batch_size=10]
 * @returns {Array<Array<any>}
 */
module.exports.createBatch = (large_arr, batch_size = 10) => {
	const arrayOfArrray = [];

	for (let i = 0; i < large_arr.length; i += batch_size) {
		const arr = large_arr.slice(i, i + batch_size);

		arrayOfArrray.push(arr);
	}

	return arrayOfArrray;
};

// * Example
// const reallyLargeArr = new Array(1001).fill(null).map((_, idx) => idx + 1);

// const batchs = this.createBatch(reallyLargeArr, 100);

// console.log(batchs)
