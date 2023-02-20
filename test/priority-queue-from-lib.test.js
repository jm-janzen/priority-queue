import PriorityQueue from '../src/priority-queue-from-lib';


describe('Priority Queue happy path unit tests', () => {

	test('Initialised', () => {
		const pq = new PriorityQueue();

		const expected = { arr: Array(3), length: 0, maxLength: 3 };
		expect(pq.store).toStrictEqual(expected);
		expect(pq.length()).toEqual(0);
	});

	test('Add and pop items (same priorities)', () => {
		const pq = new PriorityQueue();
		pq.add(pq.store, 'meow', 1);
		pq.add(pq.store, 'meow', 1);
		pq.Pop();

		expect(pq.store.arr).toBe({ item: 'meow', priority: 1 });
		expect(pq.length()).toEqual(1);
		expect(pq.count).toEqual(1);
	});

});

