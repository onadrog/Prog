import { CartPropsType } from "../types/types";
import { IdbApi } from "./Idb";
import { workerTypeEnums } from "./worker_helpers";

const Idb = new IdbApi("shopping_cart", 1, "cart");

self.onmessage = function (event) {
	switch (event.data.type) {
		case workerTypeEnums.GET:
			getFromDb(event.data.data);
			break;
		case workerTypeEnums.PUSH:
			return pushToDb(event.data.data);
		default:
			throw new Error("Wrong type send to worker");
	}
};

function pushToDb(d: ArrayBuffer): void {
	const decoder = new TextDecoder();
	const jsonString = decoder.decode(d);

	// Parse the JSON string to get the cart data
	const cartData: CartPropsType = JSON.parse(jsonString);

	Idb.putData(cartData);
	self.postMessage(`${cartData.title} added to the cart`);
}

async function getFromDb(key: IDBValidKey) {
	const encoder = new TextEncoder();
	if (key) {
		const data = encoder.encode(await Idb.getData(key)).buffer;
		self.postMessage(data);
	} else {
		const data = encoder.encode(JSON.stringify(await Idb.getAllData())).buffer;
		self.postMessage(data, [data]);
	}
}
