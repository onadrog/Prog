import type {
	ButtonHTMLAttributes,
	PropsWithChildren,
	SelectHTMLAttributes,
} from "react";

export type ProductType = {
	id: number;
	title: string;
	price: number;
	category: string;
	description: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
};

export type DropdownCartProps = {
	nbOfProducts: number;
} & PropsWithChildren;

export type CartProps = {
	products: CartPropsType[];
};
export type CartBtnProps = {
	product: ProductType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type CartMapType = Map<number, ProductType & { quantity: number }>;
export type CartPropsType = ProductType & { quantity: number };

export type CartReducerType = {
	type: "add" | "remove";
	playload: ProductType;
	quantity: number;
};

export type QuantitySelectorProps = {
	max?: number;
	product: ProductType;
} & SelectHTMLAttributes<HTMLSelectElement>;

export type ProductCartGroupProps = {
	product: ProductType;
	max?: number;
};
