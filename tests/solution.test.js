require('../Homework');
const reduce = require('../solution/')(Homework);

const { AsyncArray } = Homework;

test('reduce [1, 2, 3, 4] with function add and initial value 0 to equal 10', (done) => {
	const array = new AsyncArray([1, 2, 3, 4]);
	const reducer = (acc, curr, i, src, cb) => Homework.add(acc, curr, cb);
	const initialValue = 0;

	reduce(array, reducer, initialValue, (res) => {
		expect(res).toBe(10);
		done();
	});
});

test('reduce [1, 2, 3, 4] with function subtract and initial value 30 to equal 20', (done) => {
	const array = new AsyncArray([1, 2, 3, 4]);
	const reducer = (acc, curr, i, src, cb) => Homework.subtract(acc, curr, cb);
	const initialValue = 30;

	reduce(array, reducer, initialValue, (res) => {
		expect(res).toBe(20);
		done();
	});
});

test('reduce [1, 2, 3, 4] with function multiply and initial value 1 to equal 24', (done) => {
	const array = new AsyncArray([1, 2, 3, 4]);
	const reducer = (acc, curr, i, src, cb) => Homework.multiply(acc, curr, cb);
	const initialValue = 1;

	reduce(array, reducer, initialValue, (res) => {
		expect(res).toBe(24);
		done();
	});
});

test('reduce [1, 2, 3, 4] with function divide and initial value 24 to equal 1', (done) => {
	const array = new AsyncArray([1, 2, 3, 4]);
	const reducer = (acc, curr, i, src, cb) => Homework.divide(acc, curr, cb);
	const initialValue = 24;

	reduce(array, reducer, initialValue, (res) => {
		expect(res).toBe(1);
		done();
	});
});

test('reduce [] return initial value', (done) => {
	const array = new AsyncArray([]);
	const reducer = (acc, curr, i, src, cb) => Homework.add(acc, curr, cb);
	const initialValue = 0;

	reduce(array, reducer, initialValue, (res) => {
		expect(res).toBe(0);
		done();
	});
});

test('reduce null throws error', () => {
	const array = null;
	const reducer = (acc, curr, i, src, cb) => Homework.add(acc, curr, cb);
	const initialValue = 0;

	reduce(array, reducer, initialValue, (res) => {
		expect(res).toThrow(TypeError);
	});
});

test('reduce without callback function throws error', () => {
	const array = new AsyncArray([1, 2, 3, 4]);
	const reducer = null;
	const initialValue = 0;

	reduce(array, reducer, initialValue, (res) => {
		expect(res).toThrow(TypeError);
	});
});

test('reduce with not async array throws error', () => {
	const array = [1, 2, 3, 4];
	const reducer = (acc, curr, i, src, cb) => Homework.add(acc, curr, cb);
	const initialValue = 0;

	reduce(array, reducer, initialValue, (res) => {
		expect(res).toThrow(TypeError);
	});
});
