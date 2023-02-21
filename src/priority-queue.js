/**
 * Stores a list of items (arbitrary value) along with their numeric
 * priority values. Items with higher priorities are dequeued first
 */
export default class PriorityQueue {

	/**
	 * Initialises a queue with zero items
	 */
	constructor() {
		this.store = new Map(); // keys are priorities, values are arrays of elements
		this.count = 0;
		this._supportedTypes = [ 'string', 'number', 'boolean', 'undefined' ];
	}

	/**
	 * Adds a +value+ to this queue of the given +priority+. The higher
	 * the number given, the higher the priority.
	 *
	 * @throws {TypeError} if datatype of +value+ or +priority+ unsupported
	 *
	 * @param {Any} value
	 * @param {Integer} priority
	 */
	add(value, priority) {
		if (!Number.isInteger(priority)) {
			throw new TypeError('Parameter priority must be an integer');
		}

		if (!this._supportedTypes.includes(typeof value)) {
			throw new TypeError('Given value datatype unsupported');
		}

		if (!this.store.has(priority)) {
			this.store.set(priority, []);
		}

		this.store.get(priority).push(value);
		this.count++;
	}

	/**
	 * Removes the oldest-added value with the highest priority from this queue,
	 * and returns that value to the caller.
	 *
	 * @returns {Any}
	 */
	Pop() {
		const maxKey = Math.max(...this.get_all_priorities());
		this.count--;

		return this.store.get(maxKey).shift();
	}

	/**
	 * Return total length of all items in this queue.
	 *
	 * @returns {Integer}
	 */
	length() {
		return this.count;
	}

	/**
	 * Return list of priorities associated with this queue.
	 *
	 * @returns {Array<String>}
	 */
	get_all_priorities() {
		return [...this.store.keys()];
	}

	/**
	 * Iterates through all the queue elements in priority-then-FIFO order
	 *
	 * @deprecated Don't encourage forEach use, use our for..of instead
	 *
	 * @param {function} callback
	 */
	forEach(callback) {
		var keys = this.get_all_priorities().sort();

		for (var a = keys.length; a > 0; a--) {
			for (var b = 0; b < this.store.get(a).length; b++) {
				callback(this.store.get(a)[b]);
			}
		}
	}

	/**
	 * Iterates through all items in our queue, first by order of priority,
	 * then by order items were pushed into a particular priority "bucket",
	 * if more than 1 item exists (AKA FIFO order).
	 *
	 * @yields {Any} item
	 */
	*[Symbol.iterator]() {
		const entries = [...this.store.entries()]
			.sort()
			.reverse();
		for(const entry of entries) {
			const [ priority, items ] = entry;
			for (const item of items) {
				yield [priority, item];
			}
		}
	}

	/**
	* Change priority of an existing value to +newPriority+
	*
	* NOTE This will only change the priority of the _first_ matching value
	*
	* @param {Any} value The current value
	* @param {Integer} newPriority
	* @returns {Boolean} whether value was updated or not
	*/
	changePriority(value, newPriority) {
		let foundItem = false;

		for(const [ priority, item ] of this) {
			if (item !== value) {
				continue;
			}

			foundItem = true;

			const matchingIndex = this.store
				.get(priority)
				.findIndex(item => item === value);
			this.store
				.get(priority)
				.splice(matchingIndex, 1);

			this.add(value, newPriority);
		}

		return foundItem;
	}
}
