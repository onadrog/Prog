export interface NodeListInterface {
	head?: NodeList;
	tail?: NodeList;
}
export interface NodeList {
	next?: NodeList;
	value: number;
}

export class LinkedList implements NodeListInterface {
	public head?: NodeList | undefined;
	public tail?: NodeList | undefined;

	push(v: number) {
		const node = { value: v };
		if (!this.head || !this.tail) {
			this.head = this.tail = node;
			return;
		}
		this.tail.next = node;
		this.tail = node;
	}

	pop(): NodeList | undefined {
		if (!this.head || !this.tail) {
			return undefined;
		}
		if (this.head === this.tail) {
			const out = this.tail;
			this.head = this.tail = undefined;
			return out;
		}
		if (this.head.next === this.tail) {
			const tmp = this.tail as NodeList;
			this.head.next = undefined;
			this.head = this.tail;
			return tmp;
		}

		let curr = this.head;
		while (curr.next !== this.tail) {
			curr = curr.next as NodeList;
		}

		const out = curr.next;
		curr.next = undefined;
		this.tail = curr;

		return out;
	}

	remove(v: number): NodeList | undefined {
		if (!this.head) {
			return undefined;
		}
		let curr = this.head;
		if (curr.next === this.tail) {
			this.head = this.tail;
			return curr;
		}

		while (curr.next && curr.next.value !== v) {
			curr = curr.next;
		}

		const out = curr.next;

		if (!out) {
			curr.next = this.tail;
		} else {
			curr.next = out.next;
		}

		return out;
	}

	find(v: number): NodeList | undefined {
		if (!this.head) {
			return undefined;
		}
		let curr: NodeList | undefined = this.head;
		while (curr.value !== v) {
			if (!curr.next) {
				curr = undefined;
				break;
			}
			curr = curr.next;
		}

		return curr;
	}

	add(v: number, n: number) {
		if (!this.head || !this.tail) {
			return;
		}
		let curr = this.head;
		const node = { value: v } as NodeList;
		if (curr.value === n) {
			const tmp = curr.next;
			this.head.next = node;
			node.next = tmp;
			return;
		} else if (this.tail.value === n) {
			this.push(v);
			return;
		}
		while (curr.value !== n) {
			if (!curr.next) {
				return;
			}
			curr = curr.next;
		}

		const tmp = curr;
		node.next = tmp.next;
		curr.next = node;
	}
}
