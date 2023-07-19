import { NavLink, useLocation } from "react-router-dom";
import type { CartProps, DropdownCartProps } from "../types/types";

export function Cart({ products }: CartProps) {
	const { pathname } = useLocation();
	const isDropDown = pathname !== "/cart";
	const nbOfProducts = products.length;

	return (
		<>
			{isDropDown ? (
				<DropDownCart nbOfProducts={nbOfProducts}>
					<li>
						{products.map((p) => (
							<div key={p.id}>
								<p>{p.title}</p>
								<p>{p.price}€</p>
								<p>{p.quantity}</p>
							</div>
						))}
					</li>
				</DropDownCart>
			) : (
				<>
					{products.map((p) => (
						<div key={p.id}>
							<p>{p.title}</p>
							<p>{p.price}€</p>
							<p>{p.quantity}</p>
						</div>
					))}
				</>
			)}
		</>
	);
}

function DropDownCart({ children, nbOfProducts }: DropdownCartProps) {
	return (
		<div className="dropdown">
			<button
				className="bg-transparent position-relative border-0"
				type="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
				</svg>
				{nbOfProducts > 0 && (
					<span className="badge text-bg-dark position-absolute top-0 start-100 translate-middle p-2 border border-light rounded-circle">
						{nbOfProducts}
					</span>
				)}
			</button>
			<ul className="dropdown-menu">
				{children}
				<NavLink
					className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
					to={"cart"}
				>
					Go to cart
				</NavLink>
			</ul>
		</div>
	);
}
