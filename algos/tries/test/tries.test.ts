import { test, expect } from "vitest";
import { Trie } from "../src/tries";

const words = ["ten", "tea", "foo", "fool"];
/* test("search in trie", function () {
	const t = new Trie();
	for (const w of words) {
		t.insert(w);
	}
	expect(t.search("fo")).toBe(true);
	expect(t.search("fool")).toBe(true);
	expect(t.search("bar")).toBe(false);
}); */

test("remove from trie", function () {
	const t = new Trie();
	for (const w of words) {
		t.insert(w);
	}
	t.delete("foo");
	t.delete("tea");
	expect(t.search("fool")).toBe(true);
	expect(t.search("tea")).toBe(false);
});
