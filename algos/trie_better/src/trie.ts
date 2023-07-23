interface TrieNode {
	value: string;
	isWord: boolean;
	child: TrieNode[];
}

export class Trie {
	#root: TrieNode;
	alphasize: number;
	alphaFirstLetter: string;

	constructor(alphasize = 26, alphaFirstLetter = "a") {
		this.alphasize = alphasize;
		this.alphaFirstLetter = alphaFirstLetter.toLowerCase();
		this.#root = {
			value: "\0",
			isWord: false,
			child: new Array(this.alphasize).fill(undefined),
		};
	}

	insert(w: string) {
		if (w.length === 0) {
			return undefined;
		}
		const str = w.toLowerCase();
		let curr = this.#root;
		for (let i = 0; i < str.length; ++i) {
			const idx = this.#getIdx(str[i]);
			if (!curr.child[idx]) {
				curr.child[idx] = {
					value: "",
					isWord: false,
					child: new Array(this.alphasize).fill(undefined),
				};
			}
			curr.child[idx].value = str[i];
			curr = curr.child[idx];
		}
		curr.isWord = true;
	}

	find(p: string): string[] | undefined {
		if (p.length === 0) {
			return undefined;
		}

		const str = p.toLowerCase();
		let curr = this.#root;
		for (let i = 0; i < str.length; ++i) {
			const idx = this.#getIdx(str[i]);
			if (!curr.child[idx]) {
				return undefined;
			}

			curr = curr.child[idx];
		}
		const out = this.#findRecursively(curr, [], str[0]);
		return out.length > 0 ? out : undefined;
	}

	delete(w: string) {
		if (w.length === 0) {
			return;
		}

		const str = w.toLowerCase();

		let curr = this.#root;
		for (let i = 0; i < str.length; ++i) {
			const idx = this.#getIdx(str[i]);
			if (!curr.child[idx]) {
				return;
			}
			curr = curr.child[idx];
		}
		curr.isWord = false;
	}

	//
	//    _   _      _
	//   | | | |    | |
	//   | |_| | ___| |_ __   ___ _ __ ___
	//   |  _  |/ _ \ | '_ \ / _ \ '__/ __|
	//   | | | |  __/ | |_) |  __/ |  \__ \
	//   \_| |_/\___|_| .__/ \___|_|  |___/
	//                | |
	//                |_|
	//

	#findRecursively(
		node: TrieNode | undefined,
		out: string[],
		str: string,
	): string[] {
		if (!node) {
			return out;
		}

		let newStr = str;

		if (node.value) {
			newStr += node.value;
		}
		if (node.isWord) {
			out.push(newStr);
		}

		for (let i = 0; i < node.child.length; ++i) {
			this.#findRecursively(node.child[i], out, newStr);
		}

		return out;
	}

	#getIdx(c: string): number {
		return c.toLowerCase().charCodeAt(0) - this.alphaFirstLetter.charCodeAt(0);
	}
}
