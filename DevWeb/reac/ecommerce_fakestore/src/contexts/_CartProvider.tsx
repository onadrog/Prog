import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useReducer,
	useRef,
} from "react";
import { Cart } from "../components/Cart";
import type {
	CartPropsType,
	CartReducerType,
	ProductType,
} from "../types/types";
import { InitWorker, sendDataToWorker } from "../utils/worker_helpers";

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

	const [data, dispatch] = useReducer(cartReducer, [], init);

	cartRef.cart.set.current = useCallback(
		function (value: CartReducerType) {
			dispatch(value);
		},
		[cartRef.cart.set],
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
	const prod = state.find((p) => p.id === product.id);
	if (prod) {
		const cart = state.map((p) => {
			if (p.id === product.id) {
				return { ...product, quantity };
			} else {
				return p;
			}
		});
		sendDataToWorker(worker, cart);
		worker.onmessage = function (e) {
			console.log(e);
		};
		// TODO: remove use IdbClass instead
		localStorage.setItem("cart", JSON.stringify(cart));
		return cart;
	}
	const cart = [...state, { ...product, quantity }];
	localStorage.setItem("cart", JSON.stringify(cart));
	return cart;
}

function removeFromCart(
	product: ProductType,
	quantity: number,
	state: CartPropsType[],
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

function cartReducer(
	state: CartPropsType[],
	action: CartReducerType,
): CartPropsType[] {
	switch (action.type) {
		case "add":
			return addToCart(action.playload, action.quantity, state);
		case "remove":
			return removeFromCart(action.playload, action.quantity, state);
		default:
			throw new Error(`Action type: "${action.type}" is not supported.`);
	}
}

function init(initialValue: CartPropsType[]): CartPropsType[] {
	const storage = localStorage.getItem("cart");
	return storage ? JSON.parse(storage) : initialValue;
}
