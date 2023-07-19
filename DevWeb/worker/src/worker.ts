export function initWorkers(
	scriptURL: string | URL,
	options?: WorkerOptions | undefined,
): Worker[] {
	const threads = navigator.hardwareConcurrency || 3; // crappy safari...

	return [...Array(threads)].map((_) => new Worker(scriptURL, options));
}

export function addTaskToWorker(worker: Worker): void {
	worker.onerror = function (err) {
		worker.terminate();
		throw new Error(`Web Worker encouter an error:\n${err.message}`);
	};
}

const workers = initWorkers(new URL("./main.ts", import.meta.url));
console.log(workers);
