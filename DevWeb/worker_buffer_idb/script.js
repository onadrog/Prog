const threads = navigator.hardwareConcurrency || 2;
const worker = new Worker("worker.js");

// Define the cart data
const cartItems = [
	{ id: 1, name: "Product A", price: 10 },
	{ id: 2, name: "Product B", price: 20 },
	// Add more cart items as needed
];

const encoder = new TextEncoder();
const jsonString = JSON.stringify(cartItems);
const cartArrayBuffer = encoder.encode(jsonString).buffer;
// Send the cart data to the web worker

worker.postMessage(cartArrayBuffer, [cartArrayBuffer]);

// Handle the response from the web worker
worker.onmessage = function (event) {
	console.log(event.data); // Cart saved successfully!
};
