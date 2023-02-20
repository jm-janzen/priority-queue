import PriorityQueue from '../src/priority-queue';


describe('Priority Queue happy path unit tests', () => {

	test('Initialised', () => {
		const pq = new PriorityQueue();

		expect(pq.store).toStrictEqual(new Map());
		expect(pq.length()).toEqual(0);
	});

	test('Add and pop items (same priorities)', () => {
		const pq = new PriorityQueue();
		pq.add('meow', 1);
		pq.add('meow', 1);
		pq.Pop();

		const actual = Object.fromEntries(pq.store);
		const expectedStore = { 1: ['meow'] };
		expect(actual).toStrictEqual(expectedStore);
		expect(pq.length()).toEqual(1);
		expect(pq.count).toEqual(1);
	});

	test('Add and pop items (different priorities)', () => {
		const pq = new PriorityQueue();
		pq.add('meow', 1);
		pq.add('meow', 2);
		pq.Pop();

		const actual = Object.fromEntries(pq.store);
		const expectedStore = { 1: ['meow'], 2: [] };
		expect(actual).toStrictEqual(expectedStore);
		expect(pq.length()).toEqual(1);
		expect(pq.count).toEqual(1);
	});

	test('Get all priorities (empty)', () => {
		const pq = new PriorityQueue();

		const actual = pq.get_all_priorities();
		expect(actual).toEqual([]);
	});

	test('Get all priorities (populated)', () => {
		const pq = new PriorityQueue();
		pq.add('meow', 1);
		pq.add('woof', 2);

		const actual = pq.get_all_priorities();
		expect(actual).toEqual([ 1, 2 ]);
	});

	test('Use custom iterator', () => {
		const pq = new PriorityQueue();
		pq.add('meow', 2);
		pq.add('woof', 1);
		pq.add('bark', 1);
		pq.add('hoot #1', 3);
		pq.add('hoot #2', 3);
		pq.add('hoot #3', 3);

		const expectedOrder = [
			'hoot #1',
			'hoot #2',
			'hoot #3',
			'meow',
			'woof',
			'bark',
		];
		const actualOrder = [];
		pq.forEach(item => actualOrder.push(item));
		expect(actualOrder).toStrictEqual(expectedOrder);
	});

	test('Use custom iterator (for..of)', () => {
		const pq = new PriorityQueue();
		pq.add('meow', 2);
		pq.add('woof', 0);
		pq.add('bark', 1);
		pq.add('hoot #1', 3);
		pq.add('last', -666);
		pq.add('hoot #2', 3);
		pq.add('first', 777);
		pq.add('hoot #3', 3);

		const expectedOrder = [
			'first',
			'hoot #1',
			'hoot #2',
			'hoot #3',
			'meow',
			'bark',
			'woof',
			'last',
		];
		const actualOrder = [];
		for (const item of pq) {
			actualOrder.push(item);
		}
		expect(actualOrder).toStrictEqual(expectedOrder);
	});

});
