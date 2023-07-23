interface TrieNodeInterface {
	isWord: boolean;
	child: TrieNodeInterface[];
}

export class Trie {
	alphaSize: number;
	#rootNode: TrieNodeInterface;

	constructor(alphaSize = 26) {
		this.alphaSize = alphaSize;
		this.#rootNode = {
			isWord: false,
			child: [],
		};
	}

	search(w: string): boolean {
		const str = w.toLowerCase();
		let currNode = this.#rootNode;
		for (let i = 0; i < w.length; ++i) {
			const idx = this.#getCharIdx(str[i]);
			if (!currNode.child[idx]) {
				return false;
			}
			currNode = currNode.child[idx];
		}

		return true;
	}
	insert(w: string) {
		const str = w.toLowerCase();
		let currNode = this.#rootNode;
		for (let i = 0; i < w.length; ++i) {
			const idx = this.#getCharIdx(str[i]);
			if (!currNode.child[idx]) {
				currNode.child[idx] = {
					child: [],
					isWord: false,
				};
			}
			currNode = currNode.child[idx];
		}

		currNode.isWord = true;
	}

	delete(w: string) {
		const str = w.toLowerCase();
		let curr = this.#rootNode;
		for (let i = 0; i < str.length; ++i) {
			const idx = this.#getCharIdx(str[i]);
			if (!curr.child[idx]) {
				return;
			}

			if (curr.child[idx].child.length === 0) {
				curr.child[idx] = undefined;
				break;
			}

			curr = curr.child[idx];
		}
		curr.isWord = false;

		// console.log(curr.child);
	}

	#getCharIdx(c: string) {
		const str = c.toLowerCase();
		return str.charCodeAt(0) - "a".charCodeAt(0);
	}
}
