import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { CartContext } from "../contexts/CartProvider";
import type { CartReducerType, ProductType } from "../types/types";

export function useCart() {
	const cartRef = useContext(CartContext);
	return {
		CartDispatcher: useCallback(
			function (value: CartReducerType) {
				cartRef.cart.set.current(value);
			},
			[cartRef.cart.set],
		),
		getProductsAsync: useCallback(
			async function () {
				return await cartRef.cart.getAsync.current();
			},
			[cartRef.cart.getAsync],
		),
		getProdSync: useCallback(
			function () {
				return cartRef.cart.getSync.current();
			},
			[cartRef.cart.getSync],
		),
	};
}

/* NUL A CHIER REFACTO NEEDED */
export function useAsyncReducer(reducer, initialArg, init = undefined) {
	const [state, setState] = useState(initialArg);

	const initializerRef = useRef(null);

	const res = async function () {
		const req = await init(initialArg);
		return await req;
	};
	if (init && !initializerRef.current) {
		initializerRef.current = useCallback(res, [init]);
	}
	const dispatch = async (action) => {
		const result = reducer(state, action);
		if (typeof result.then === "function") {
			try {
				const newState = await result;
				setState(newState);
			} catch (err) {
				setState({ ...state, error: err });
			}
		} else {
			setState(result);
		}
	};

	// TODO: Only call a start
	// SOMETHING WENT WRONG
	return [state, dispatch];
}

/*
function mountReducer(reducer, initialArg, init) {
	var hook = mountWorkInProgressHook();
	var initialState;

	if (init !== undefined) {
		initialState = init(initialArg);
	} else {
		initialState = initialArg;
	}

	hook.memoizedState = hook.baseState = initialState;
	var queue = {
		pending: null,
		interleaved: null,
		lanes: NoLanes,
		dispatch: null,
		lastRenderedReducer: reducer,
		lastRenderedState: initialState,
	};
	hook.queue = queue;
	var dispatch = (queue.dispatch = dispatchReducerAction.bind(
		null,
		currentlyRenderingFiber$1,
		queue,
	));
	return [hook.memoizedState, dispatch];
}




*/
