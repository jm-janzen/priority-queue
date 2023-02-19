import PriorityQueue from '../src/priority-queue';


describe('Priority Queue happy path unit tests', () => {

	test('Initialised', () => {
		const pq = new PriorityQueue();

		expect(pq.store).toStrictEqual({});
		expect(pq.length()).toEqual(0);
	});

	test('Add and pop items (same priorities)', () => {
		const pq = new PriorityQueue();
		pq.add('meow', 1);
		pq.add('meow', 1);
		pq.Pop();

		expect(pq.store).toStrictEqual({ '1': ['meow'] });
		expect(pq.length()).toEqual(1);
		expect(pq.count).toEqual(1);
	});

	// NOTE Holding off on this one since bug prevents it
	// from working as expected.
	test.todo('Add and pop items (different priorities)');

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
		expect(actual).toEqual([ '1', '2' ]);
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
		pq.forEach(item => expect(item).toEqual(expectedOrder.shift()));
	});

	// NOTE Holding off since bug in custom implementation of forEach prevents
	// the method from working with gaps in priority, or priorities less than 0
	test.todo('Use custom iterator (with gaps)');

});
