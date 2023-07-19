const ENTRYPOINT = "https://fakestoreapi.com/";

export async function getDataFromApi<T>(
	url: URL,
	params?: RequestInit,
): Promise<T> {
	const path = getUrlParams(url);
	const req = await fetch(`${ENTRYPOINT}${path}`, params);
	const res: Promise<T> = await req.json();
	return res;
}

function getUrlParams(url: URL): string {
	const pathname = url.pathname.startsWith("/")
		? url.pathname.replace("/", "")
		: url.pathname;
	if (!url.search) {
		return pathname;
	}

	for (const [key, value] of url.searchParams.entries()) {
		switch (key) {
			case "price[gte]":
				url.searchParams.set(key, String(parseInt(value, 10) * 100));
				break;
			case "price[lte]":
				url.searchParams.set(key, String(parseInt(value, 10) * 100));
				break;
			default:
				break;
		}
	}

	return `${pathname}${url.search}`;
}
