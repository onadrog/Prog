import { CartPropsType } from "../types/types";

let iota = 0;
export const workerTypeEnums = {
	PUSH: iota++,
	GET: iota++,
};

export function InitWorker(
	script: string | URL = new URL("./worker.ts", import.meta.url),
	options: WorkerOptions = { type: "module" },
): Worker {
	return new Worker(script, options);
}

export function sendDataToWorker<T>(worker: Worker, data: T): void {
	const tEncoder = new TextEncoder();
	const payload = tEncoder.encode(JSON.stringify(data)).buffer;
	worker.postMessage({ type: workerTypeEnums.PUSH, data: payload }, [payload]);
}

export function listenToWorker(worker: Worker): void {
	worker.onerror = function (err) {
		worker.terminate();
		throw new Error(`Web Worker encouter an error:\n${err.message}`);
	};
	worker.onmessageerror = (event) => {
		console.error(`Error receiving message from worker: ${event}`);
	};
	worker.onmessage = (event) => {
		console.log(`Received message from worker: ${event.data}`);
	};
}

export function sendUpdateWorker(): void {}

export function IsItemInDb(worker: Worker, id: number): boolean {
	worker.onmessage = (e) => {
		return e.data;
	};
}
/* export function getAllDataFromWorker(
	worker: Worker,
	key?: IDBValidKey,
): CartPropsType[] | null {
	worker.postMessage({ type: workerTypeEnums.GET, data: key });
	worker.onmessage = (e) => console.log(e.data);
	return null;
} */

export function getAllDataFromWorker(
	worker: Worker,
	key?: IDBValidKey,
): Promise<CartPropsType[] | null> {
	worker.postMessage({ type: workerTypeEnums.GET, data: key });
	return new Promise((resolve, reject) => {
		worker.onmessage = (event) => {
			const decoder = new TextDecoder();
			resolve(JSON.parse(decoder.decode(event.data)));
		};

		worker.onerror = (error) => {
			reject(error);
		};
	});
}
