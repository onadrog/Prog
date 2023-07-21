import { test, expect } from "vitest";
import { DoubleLinkedList } from "../src/double_linked_list";

test("push / get tail from dll", function () {
	const dll = new DoubleLinkedList();
	dll.push(1);
	dll.push(2);
	dll.push(3);
	expect(dll.tail?.value).toBe(3);
	expect(dll.tail?.prev?.value).toBe(2);
});

test("find from dll", function () {
	const dll = new DoubleLinkedList();
	dll.push(2);
	dll.push(4);
	dll.push(6);
	expect(dll.find(4)?.value).toBe(4);
	expect(dll.find(6)).toEqual(dll.tail);
	expect(dll.find(69)).toBeUndefined();
	expect(dll.find(2)?.next?.value).toBe(4);
});

test("pop from dll", function () {
	const dll = new DoubleLinkedList();
	dll.push(2);
	dll.push(4);
	dll.push(6);
	expect(dll.pop()?.value).toBe(6);
	expect(dll.find(6)).toBeUndefined();
	expect(dll.tail?.value).toBe(4);
});

test("add where in dll", function () {
	const dll = new DoubleLinkedList();
	dll.push(2);
	dll.push(4);
	dll.push(6);
	dll.add(3, 2);
	expect(dll.find(3)?.value).toBe(3);
	expect(dll.find(2)?.next?.value).toBe(3);
	expect(dll.find(4)?.prev?.value).toBe(3);
	dll.add(9, 6);
	expect(dll.find(6)?.next?.value).toBe(9);
	expect(dll.tail?.value).toBe(9);
});

test("remove from dll", function () {
	const dll = new DoubleLinkedList();
	dll.push(2);
	dll.push(4);
	dll.push(6);
	dll.push(8);
	// remove from middle
	expect(dll.remove(4)?.value).toBe(4);
	expect(dll.find(4)).toBeUndefined();
	expect(dll.find(2)?.next?.value).toBe(6);
	expect(dll.find(6)?.prev?.value).toBe(2);
	//remove head
	expect(dll.remove(2)?.value).toBe(2);
	expect(dll.find(2)).toBeUndefined();
	expect(dll.head?.value).toBe(6);

	// 6 8 9
	// remove tail
	dll.push(9);
	expect(dll.tail?.value).toBe(9);
	expect(dll.remove(9)?.value).toBe(9);
	expect(dll.tail?.value).toBe(8);
});
