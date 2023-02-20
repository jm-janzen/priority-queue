import PQ from 'priority-queue';

export default class PriorityQueue {
	constructor(size = 3) {
		this.store = PQ.create(size);
	}

	/**
	 * Add +item+ to our queue at given +priority+
	 *
	 * NOTE This implementation does not support multiple items of the same priority.
	 *
	 * @param {Any} item
	 * @param {Integer} priority
	 */
	add(item, priority) {
		PQ.queue(this.store, item, priority);
	}

	Pop() {
		PQ.dequeue(this.store);
	}

	length() {
		return this.store.size || 0;
	}

}
