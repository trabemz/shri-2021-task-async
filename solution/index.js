module.exports = function (Homework) {
	const { less, add, equal, AsyncArray } = Homework;

	function promisify(f) {
		return function (...args) {
			return new Promise(function (resolve) {
				args.push(function (res) {
					resolve(res);
				});

				f.call(this, ...args);
			});
		};
	}

	const lessPromise = promisify(less);
	const addPromise = promisify(add);
	const equalPromise = promisify(equal);

	return async function (array, fn, initialValue, cb) {
		try {
			if (await equalPromise(array, null)) {
				return new TypeError("Can't iterate over undefined or null");
			}
			if (!(await equalPromise(typeof fn, 'function'))) {
				return new TypeError('Reduce callback is not a function');
			}
			if (!(array instanceof AsyncArray)) {
				return new TypeError('Array should be instance of AsyncArray');
			}

			const lengthPromise = promisify(array.length);
			const fnPromise = promisify(fn);
			const getPromise = promisify(array.get);

			let result = initialValue;
			const length = await lengthPromise();

			if (await equalPromise(length, 0)) {
				return cb(initialValue);
			}

			for (
				let i = 0;
				await lessPromise(i, length);
				i = await addPromise(i, 1)
			) {
				result = await fnPromise(result, await getPromise(i), i, array);
			}

			return cb(result);
		} catch (err) {
			console.error(err.message);
			return err;
		}
	};
};
