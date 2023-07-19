import { NavLink } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { FilterForm } from "../components/Filter";
import { ProductType } from "../types/types";
import { getDataFromApi } from "../utils/api";

export async function loader({ request }: { request: Request }) {
	const url = new URL(request.url);
	return await getDataFromApi<ProductType[]>(url);
}

export function ProductsList() {
	const data = useLoaderData() as ProductType[];

	return (
		<div className="row">
			<FilterForm />
			<div className="col-12 col-md-8 col-lg-9">
				<div className="row">
					{data.map((d) => (
						<NavLink
							to={d.id.toString()}
							key={d.id}
							className="col-6 col-md-4 "
						>
							<div className="card border-light mb-3">
								<img
									height="150"
									width="150"
									src={d.image}
									className="card-img-top rounded-0 "
									alt="..."
								/>
								<div className="card-body">
									<p className="card-text">{d.title}</p>
									<p className="card-text text-muted">{d.price}€</p>
								</div>
							</div>
						</NavLink>
					))}
				</div>
			</div>
		</div>
	);
}
