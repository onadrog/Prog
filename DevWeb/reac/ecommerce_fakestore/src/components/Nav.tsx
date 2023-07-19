import { NavLink } from "react-router-dom";
import { CartWithCtx } from "../contexts/CartProvider";

export function Nav() {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<NavLink
							className={({ isActive }) =>
								`nav-link ${isActive ? "active" : ""}`
							}
							to={"products"}
						>
							Products
						</NavLink>
					</ul>
					<div className="d-flex">
						<CartWithCtx />
					</div>
				</div>
			</div>
		</nav>
	);
}
