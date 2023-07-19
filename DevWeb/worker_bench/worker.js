self.onmessage = async (e) => {
	// const req = await fetch(new TextDecoder().decode(e.data));
	const req = await fetch(e.data);
	const data = await req.arrayBuffer();
	// self.postMessage(data);
	const res = new TextDecoder().decode(data);
	self.postMessage(res);
};
