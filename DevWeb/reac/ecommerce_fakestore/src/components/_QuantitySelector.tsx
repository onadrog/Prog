import { ChangeEvent, useCallback, useMemo } from "react";
import type { CartReducerType, QuantitySelectorProps } from "../types/types";
import { useCart } from "../hooks/hooks";

export function QuantitySelector({
	max = 10,
	product,
	...props
}: QuantitySelectorProps) {
	const { CartDispatcher } = useCart();
	const maxQ = useMemo(
		function () {
			return new Array(max).fill(0);
		},
		[max],
	);

	const handleChange = useCallback(function ({
		target,
	}: ChangeEvent<HTMLSelectElement>) {
		const quantity = parseInt(target.value, 10);
		let type = "add" as CartReducerType["type"];
		if (quantity > max) {
			target.classList.add("invisible");
			type = "remove";
		}
		const data: CartReducerType = {
			type,
			quantity,
			playload: product,
		};
		CartDispatcher(data);
	}, []);

	return (
		<select className="form-select" onChange={handleChange} {...props}>
			<option value={++maxQ.length}>&#xF78B;</option>
			{maxQ.map((_, i) => (
				<option key={i + 1} value={i + 1}>
					{i + 1}
				</option>
			))}
		</select>
	);
}
