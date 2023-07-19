import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useRef,
} from "react";
import { Cart } from "../components/Cart";
import type {
	CartPropsType,
	CartReducerType,
	ProductType,
} from "../types/types";
import {
	getAllDataFromWorker,
	InitWorker,
	sendDataToWorker,
} from "../utils/worker_helpers";
import { useAsyncReducer } from "../hooks/hooks";

const defaultRef = function (_: CartReducerType) {};

const worker = InitWorker();

const defaultPromiseRef = function () {
	return Promise.resolve<ProductType[]>([]);
};

const defaultGetProdSync = function (): ProductType[] {
	return [];
};

const defaultCtx = {
	cart: {
		set: { current: defaultRef },
		getAsync: { current: defaultPromiseRef },
		getSync: { current: defaultGetProdSync },
	},
};

export const CartContext = createContext(defaultCtx);

export function CartCtxProvider({ children }: PropsWithChildren) {
	const cartRef = useRef(defaultRef);
	const promiseRef = useRef(defaultPromiseRef);
	const getProdSync = useRef(defaultGetProdSync);
	return (
		<CartContext.Provider
			value={{
				cart: { set: cartRef, getAsync: promiseRef, getSync: getProdSync },
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function CartWithCtx() {
	const cartRef = useContext(CartContext);

	const [data, dispatch] = useAsyncReducer(cartReducer, [], init);

	cartRef.cart.set.current = useCallback(
		function (value: CartReducerType) {
			dispatch(value);
		},
		[cartRef.cart.set, dispatch],
	);

	cartRef.cart.getAsync.current = useCallback(
		function () {
			return new Promise((resolve, reject) => {
				try {
					resolve(data);
				} catch (e) {
					reject(e);
				}
			});
		},
		[data],
	);

	cartRef.cart.getSync.current = useCallback(
		function () {
			return data;
		},
		[cartRef.cart.getSync, data],
	);

	return <Cart products={data} />;
}

function addToCart(
	product: ProductType,
	quantity: number,
	state: CartPropsType[],
): CartPropsType[] {
	let data = [...state, { ...product, quantity }];
	sendDataToWorker(worker, { ...product, quantity });
	const prod = state.find((p) => p.id === product.id);
	if (prod) {
		data = state.map((p) => {
			if (p.id === product.id) {
				return { ...product, quantity };
			} else {
				return p;
			}
		});
	}
	worker.onmessage = (e) => {
		console.log(e.data);
	};

	return data;
}
/*
function removeFromCart(
	product: ProductType,
	quantity: number,
): CartPropsType[] {
	const prod = state.find((p) => p.id === product.id);
	if (prod) {
		if (prod.quantity - quantity <= 0) {
			const cart = state.filter((p) => p.id !== product.id);

			localStorage.setItem("cart", JSON.stringify(cart));
			return cart;
		}
		prod.quantity -= quantity;
	}
	localStorage.setItem("cart", JSON.stringify(state));
	return state;
}
*/

function cartReducer(
	state: CartPropsType[],
	action: CartReducerType,
): Promise<CartPropsType[]> {
	return new Promise((resolve) => {
		switch (action.type) {
			case "add":
				resolve(addToCart(action.playload, action.quantity, state));
				break;
			default:
				throw new Error(`Action type: "${action.type}" is not supported.`);
		}
	});
}

/* async function init(initialValue: CartPropsType[]): CartPropsType[] {
	const res = await getAllDataFromWorker(worker);
	return res || initialValue;
} */

async function init(initialValue: CartPropsType[]): Promise<CartPropsType[]> {
	// return initialValue;
	const res = await getAllDataFromWorker(worker);
	return res || initialValue;
}
