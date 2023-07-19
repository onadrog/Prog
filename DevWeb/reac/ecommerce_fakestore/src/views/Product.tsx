import { useLoaderData } from "react-router-dom";
import type { ProductType } from "../types/types";
import { getDataFromApi } from "../utils/api";
import { ProductToCartGroup } from "../components/ProductToCartGroup";

export async function loader({ request }: { request: Request }) {
	const url = new URL(request.url);
	return getDataFromApi<ProductType>(url);
}

export function Product() {
	const data = useLoaderData() as ProductType;

	return (
		<div>
			<img alt="" src={data.image} height="150" width="150" />
			<p>{data.title}</p>
			<p>{data.description}</p>
			<p>{data.price}€</p>
			<div className="d-inline-flex p-2">
				<ProductToCartGroup product={data} />
			</div>
		</div>
	);
}
