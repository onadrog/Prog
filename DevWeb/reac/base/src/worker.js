import { Idb } from "./idb";
const idb = new Idb();

let iota = 0;
export const ENUM_TYPE = {
	PUT: iota++,
	GETALL: iota++,
	GET: iota++,
	DELETE: iota++,
};

self.onmessage = async function (e) {
	/** @type {ArrayBuffer} */
	const buffer_data = e.data;
	/** @type {number} */
	const type = buffer_data[buffer_data.byteLength - 1];
	/** @type {number} */
	const key = buffer_data[buffer_data.byteLength - 2];

	const encoder = new TextEncoder();
	let data = encoder.encode("oi m8!").buffer;
	switch (type) {
		case ENUM_TYPE.PUT:
			idb.putData(buffer_data.slice(0, buffer_data.byteLength - 2), key);
			break;
		case ENUM_TYPE.GETALL: {
			const tmp = await idb.getAllData();
			data = tmp.result[0].buffer;
			break;
		}
		default:
			throw new Error(`${type}`);
	}
	self.postMessage(data, [data]);
};
