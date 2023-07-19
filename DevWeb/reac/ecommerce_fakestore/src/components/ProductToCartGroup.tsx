import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import type { ProductCartGroupProps, CartReducerType } from "../types/types";
import { useCart } from "../hooks/hooks";
import { useMemo } from "react";

/**
 * Collection of button to add / remove products from cart.
 * MUST be used within the `CartProvider`.
 */
export function ProductToCartGroup({
	product,
	max = 10,
}: ProductCartGroupProps) {
	const { CartDispatcher } = useCart();
	const [visible, setVisible] = useState(true);
	const maxQ = useMemo(
		function () {
			return new Array(max).fill(0);
		},
		[max],
	);

	const handleCartBtn = useCallback(function ({
		target,
	}: ChangeEvent<HTMLSelectElement> | MouseEvent<HTMLButtonElement>) {
		let reducerType = "add" as CartReducerType["type"];
		let value = 1;
		if (target instanceof HTMLSelectElement) {
			value = parseInt(target.value, 10);
			if (value > max) {
				reducerType = "remove";
				setVisible((v) => !v);
			}
		} else {
			setVisible((v) => !v);
		}
		CartDispatcher({
			playload: product,
			quantity: value,
			type: reducerType,
		});
	}, []);

	return (
		<div>
			<button
				type="button"
				onClick={handleCartBtn}
				className={`btn btn-primary ${visible ? "visible" : "invisible"}`}
			>
				Add to Cart
			</button>
			<select
				className={`form-select ${!visible ? "visible" : "invisible"}`}
				onChange={handleCartBtn}
			>
				<option value={++maxQ.length}>&#xF78B;</option>
				{maxQ.map((_, i) => (
					<option key={i + 1} value={i + 1}>
						{i + 1}
					</option>
				))}
			</select>
		</div>
	);
}
