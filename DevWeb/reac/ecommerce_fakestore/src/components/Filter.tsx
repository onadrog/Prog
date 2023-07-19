import { PropsWithChildren } from "react";
import { Form } from "react-router-dom";

type FilterProps = {
	action?: string;
} & PropsWithChildren;

export function FilterForm({ action }: FilterProps) {
	return (
		<aside className="col-12 col-md-4 col-lg-3">
			<p>Filter options</p>
			<Form action={action} className="row align-items-center">
				<div className="accordion accordion-flush" id="accordionFlushExample">
					<div className="accordion-item">
						<h2 className="accordion-header">
							<button
								className="accordion-button collapsed"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#flush-collapseOne"
								aria-expanded="false"
								aria-controls="flush-collapseOne"
							>
								Price
							</button>
						</h2>
						<div
							id="flush-collapseOne"
							className="accordion-collapse collapse"
							data-bs-parent="#accordionFlushExample"
						>
							<div className="accordion-body">
								<div className="input-group mb-3">
									<span className="input-group-text">Min €</span>
									<input
										type="number"
										min={1}
										placeholder="1"
										className="form-control"
										aria-label="Dollar amount (with dot and two decimal places)"
										name="price[min]"
									/>
								</div>

								<div className="input-group">
									<span className="input-group-text">Max €</span>
									<input
										type="number"
										className="form-control"
										aria-label="Dollar amount (with dot and two decimal places)"
										name="price[max]"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button type="submit" className="btn btn-primary">
					Filter
				</button>
			</Form>
		</aside>
	);
}
