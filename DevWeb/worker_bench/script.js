(async function regular() {
	const start = performance.now();
	const req = await fetch("./products.json");
	const res = await req.json();
	console.log(res);
	const finish = performance.now();
	console.log("----------------------------------------");
	console.log(`\t regular duration: ${finish - start}ms`);
	console.log("----------------------------------------");
})();
(async function workered() {
	const start = performance.now();
	const worker = new Worker("./worker.js");

	// worker.postMessage(new TextEncoder().encode("./products.json"));
	worker.postMessage("./products.json");
	worker.onmessage = (e) => {
		const a = new TextDecoder().decode(e.data);
		console.log(JSON.parse(a));
		const finish = performance.now();
		console.log("----------------------------------------");
		console.log(`\t worker duration: ${finish - start}ms`);
		console.log("----------------------------------------");
	};
})();
