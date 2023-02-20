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
	}

	/**
	 * Adds a +value+ to this queue of the given +priority+. The higher
	 * the number given, the higher the priority.
	 *
	 * @param {Any} value
	 * @param {Integer} priority
	 */
	add(value, priority) {
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
	* Change priority of an existing value to +newPriority+
	*
	* @param {Any} value The current value
	* @param {Integer} newPriority
	* @returns {Boolean} whether value was updated or not
	*/
	changePriority(value, newPriority) {
		var foundItem = false;

		this.store.forEach(function (bucket) {
			bucket.forEach(function (item, index) {
				if (item === value) {
					bucket.splice(index, 1); // remove the item
					this.add(value, newPriority);
					foundItem = true;

					return false; // early exit from forEach
				}
			});

			if (foundItem) {
				return false;
			}
		});
	}
}
