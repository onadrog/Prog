interface DoubleLinkedListInterface {
	head?: DNodeInterface;
	tail?: DNodeInterface;
}
interface DNodeInterface {
	value: number;
	prev?: DNodeInterface;
	next?: DNodeInterface;
}

export class DoubleLinkedList implements DoubleLinkedListInterface {
	public head?: DNodeInterface;
	public tail?: DNodeInterface;

	push(v: number) {
		const node = { value: v } as DNodeInterface;
		if (!this.head || !this.tail) {
			this.head = this.tail = node;
			return;
		}

		node.prev = this.tail;
		this.tail.next = node;
		this.tail = node;
	}

	add(v: number, n: number) {
		if (!this.head || !this.tail) {
			this.push(v);
			return;
		}
		let curr = this.head;
		while (curr.value !== n) {
			if (!curr.next) {
				break;
			}
			curr = curr.next;
		}

		const node = { value: v } as DNodeInterface;
		node.prev = curr;
		if (curr === this.tail) {
			this.tail = node;
			curr.next = this.tail;
			return;
		}
		node.next = curr.next;
		(curr.next as DNodeInterface).prev = node;
		curr.next = node;
	}

	remove(v: number): DNodeInterface | undefined {
		if (!this.head || !this.tail) {
			return undefined;
		}
		if (this.head.value === v) {
			const out = this.head;
			(this.head.next as DNodeInterface).prev = undefined;
			this.head = this.head.next;
			return out;
		} else if (this.tail.value === v) {
			const out = this.tail;
			(this.tail.prev as DNodeInterface).next = undefined;
			this.tail = this.tail.prev;
			return out;
		}
		let curr = this.head.next;

		while (curr?.value !== v) {
			curr = curr?.next;
		}
		const out = curr;
		(curr.prev as DNodeInterface).next = curr.next;
		(curr.next as DNodeInterface).prev = curr.prev;

		return out;
	}

	find(v: number): DNodeInterface | undefined {
		if (!this.head || !this.tail) {
			return undefined;
		}
		if (this.head.value === v) {
			return this.head;
		} else if (this.tail.value === v) {
			return this.tail;
		}

		let curr = this.head.next;

		while (curr?.value !== v) {
			if (!curr?.next) {
				curr = undefined;
				break;
			}
			curr = curr?.next;
		}

		return curr;
	}

	pop(): DNodeInterface | undefined {
		if (!this.head || !this.tail) {
			return undefined;
		}
		if (this.head === this.tail) {
			const tmp = this.tail;
			this.head = this.tail = undefined;
			return tmp;
		} else if (this.head.next === this.tail) {
			const tmp = this.tail;
			this.head.next = this.tail.prev = undefined;
			this.head = this.tail;
			return tmp;
		}
		const tmp = this.tail;
		(this.tail.prev as DNodeInterface).next = undefined;
		this.tail = this.tail.prev;
		return tmp;
	}
}
