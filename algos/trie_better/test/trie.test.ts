import { test, expect } from "vitest";
import { Trie } from "../src/trie";

const words = ["foo", "fool", "foolish", "bar", "baz"];

test("find from partial in trie", function () {
	const t = new Trie();
	for (const w of words) {
		t.insert(w);
	}
	expect(t.find("hel")).toBeUndefined();
	expect(t.find("fo")).toStrictEqual(words.slice(0, 3));
});

test("remove in trie", function () {
	const t = new Trie();
	for (const w of words) {
		t.insert(w);
	}
	t.delete("bar");
	expect(t.find("bar")).toBeUndefined();
	expect(t.find("ba")).toStrictEqual(["baz"]);
});
