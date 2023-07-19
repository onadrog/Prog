import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../views/error_page";
import { Root } from "../views/Root";
import {
	loader as ProductsListLoader,
	ProductsList,
} from "../views/ProductsList";
import { loader as ProductLoader, Product } from "../views/Product";
import { FinalCart, loader as finalCartLoader } from "../views/finalCart";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						path: "products",
						element: <ProductsList />,
						loader: ProductsListLoader,
					},
					{
						path: "products/:id",
						element: <Product />,
						loader: ProductLoader,
					},
					{
						path: "cart",
						element: <FinalCart />,
					},
				],
			},
		],
	},
]);
