import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "bootstrap";
import { CartCtxProvider } from "./contexts/CartProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<CartCtxProvider>
			<RouterProvider router={router} />
		</CartCtxProvider>
	</React.StrictMode>,
);
