self.onmessage = function (event) {
	// Extract the cart ArrayBuffer from the message
	const cartArrayBuffer = event.data;

	// Decode the ArrayBuffer to a string
	const decoder = new TextDecoder();
	const jsonString = decoder.decode(cartArrayBuffer);

	// Parse the JSON string to get the cart data
	const cartData = JSON.parse(jsonString);

	// Open or create a connection to the IndexedDB database
	const request = indexedDB.open("shoppingCart", 1);

	// Handle database upgrade and creation
	request.onupgradeneeded = function (event) {
		const db = event.target.result;
		db.createObjectStore("cart", { keyPath: "id" });
	};

	// Handle successful database opening
	request.onsuccess = function (event) {
		const db = event.target.result;

		// Start a transaction and get the object store
		const transaction = db.transaction(["cart"], "readwrite");
		const objectStore = transaction.objectStore("cart");

		// Clear existing cart items
		objectStore.clear();

		// Save each item in the cart
		cartData.forEach(function (item) {
			objectStore.add(item);
		});

		// Close the transaction and database connection
		transaction.oncomplete = function () {
			db.close();
			self.postMessage("Cart saved successfully!");
		};
	};
};
