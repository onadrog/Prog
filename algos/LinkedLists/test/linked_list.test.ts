import { test, expect, beforeEach } from "vitest";
import { LinkedList } from "../src/linked_list";

/* beforeEach(function () {
const ll = new LinkedList();
    ll.push(1);
    ll.push(2);
    ll.push(3);
    ll.push(4);
    ll.push(5);
}); */
test("get node from ll", function () {
	const ll = new LinkedList();
	ll.push(2);
	ll.push(5);
	expect(ll.find(2)?.value).toBe(2);
	expect(ll.find(5)?.next).toBeUndefined();
	expect(ll.find(6)).toBeUndefined();
});

test("pop from ll", function () {
	const ll = new LinkedList();
	ll.push(1);
	ll.push(4);
	ll.push(5);
	const v = ll.pop();
	expect(v?.value).toBe(5);
	expect(ll.find(5)).toBeUndefined();
});

test("remove from ll", function () {
	const ll = new LinkedList();
	ll.push(2);
	ll.push(3);
	ll.push(5);
	const v = ll.remove(3);

	expect(v?.value).toBe(3);
	expect(ll.find(3)).toBeUndefined();
});
test("add where from ll", function () {
	const ll = new LinkedList();
	ll.push(2);
	ll.push(3);
	ll.push(5);

	ll.add(6, 3);
	expect(ll.find(3)?.next?.value).toBe(6);
	expect(ll.find(6)?.next?.value).toBe(5);
});
